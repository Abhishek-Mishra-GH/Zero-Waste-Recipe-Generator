const express = require("express");
const router = express.Router();
const prisma = require("../../prisma/client");
const authenticateToken = require("../middlewares/auth.middleware");
const { format } = require("date-fns");

router.post("/", authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const donation = req.body;

  try {
    await prisma.donation.create({
      data: {
        userId,
        ...donation,
      },
    });
    res.status(201).json({ message: "Donation saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save donation" });
  }
});

router.put("/accept/:donationid", authenticateToken, async (req, res) => {
  const { donationid } = req.params;
  const donationId = donationid;
  const ngoId = req.user.id;

  console.log("NGO ID:", ngoId);

  const donation = await prisma.donation.findUnique({
    where: { id: donationId },
    select: { status: true },
  });

  if (!donation) {
    return res.status(404).json({ error: "Donation not found" });
  }

  if (donation.status !== "pending") {
    return res.status(400).json({ error: "Donation is not pending" });
  }

  try {
    await prisma.donation.update({
      where: { id: donationId },
      data: {
        status: "accepted",
        ngoId,
      },
    });
    res.status(200).json({ message: "Donation accepted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to accept donation" });
  }
});

router.get("/accepted", authenticateToken, async (req, res) => {
  const ngoId = req.user.id;
  try {
    const donations = await prisma.donation.findMany({
      where: {
        ngoId,
        status: "accepted",
      },
      include: {
        user: {
          select: {
            fullName: true,
            phone: true,
          },
        },
      },
      
      orderBy: { createdAt: "desc" },
    });

    const formatted = donations.map((donation) => ({
      id: donation.id,
      donorName: donation.user.fullName,
      foodType: donation.foodCategory,
      items: donation.foodItems.split(",").map((item) => item.trim()),
      quantity: donation.quantity,
      expiry: donation.expiry,
      location: donation.location,
      acceptedDate: format(new Date(donation.createdAt), "MMMM d, yyyy"),
      pickupScheduled: `${donation.preparationDate}, ${donation.preparationTime}`,
      status: donation.status,
      contactPhone: donation.contactPhone || donation.user.phone,
    }));

    res.status(200).json(formatted);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch donations" });
  }
});

router.get("/pending", async (req, res) => {
  try {
    const donations = await prisma.donation.findMany({
      where: { status: "pending" },
      include: {
        user: {
          select: {
            fullName: true,
            phone: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const formatted = donations.map((donation) => ({
      id: donation.id,
      donorName: donation.user.fullName,
      foodType: donation.foodCategory,
      items: donation.foodItems.split(",").map((item) => item.trim()),
      quantity: donation.quantity,
      expiry: donation.expiry,
      location: donation.location,
      postedDate: format(new Date(donation.createdAt), "MMMM d, yyyy"),
      contactPhone: donation.contactPhone || donation.user.phone,
      pickupTimes: donation.pickupTimes,
      notes: donation.description || "No additional notes",
      image: donation.foodImage,
    }));

    res.status(200).json(formatted);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch donations" });
  }
});

router.get("/", authenticateToken, async (req, res) => {
  const userId = req.user.id;

  try {
    const donations = await prisma.donation.findMany({
      where: { userId },
      include: {
        ngo: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const formattedDonations = donations.map((donation) => ({
      id: donation.id,
      date: format(new Date(donation.createdAt), "MMMM d, yyyy"),
      organization: donation.ngo?.ngoName || "Waiting for an NGO to accept",
      items: donation.foodItems.split(",").map((item) => item.trim()),
      quantity: donation.quantity,
      expiry: donation.expiry,
      location: donation.location,
      status: donation.status,
    }));

    res.status(200).json(formattedDonations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch donations" });
  }
});

module.exports = router;
