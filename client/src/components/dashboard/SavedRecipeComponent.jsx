import { useState } from "react"
import { LuSearch, LuTrash2, LuHeart, LuClock } from "react-icons/lu"
import image from "../../assets/home-page/food1.webp"

export default function SavedRecipeComponent() {
  const [savedRecipes, setSavedRecipes] = useState([
    {
      id: 1,
      title: "Garlic Chicken with Sautéed Spinach",
      image: "/placeholder.svg?height=200&width=300&text=Chicken+Spinach",
      time: "25 mins",
      difficulty: "Easy",
      category: "Dinner",
      favorite: true,
    },
    {
      id: 2,
      title: "Avocado Toast with Poached Eggs",
      image: "/placeholder.svg?height=200&width=300&text=Avocado+Toast",
      time: "15 mins",
      difficulty: "Easy",
      category: "Breakfast",
      favorite: false,
    },
    {
      id: 3,
      title: "Quinoa Salad with Roasted Vegetables",
      image: "/placeholder.svg?height=200&width=300&text=Quinoa+Salad",
      time: "30 mins",
      difficulty: "Medium",
      category: "Lunch",
      favorite: true,
    },
    {
      id: 4,
      title: "Chocolate Banana Smoothie",
      image: "/placeholder.svg?height=200&width=300&text=Smoothie",
      time: "5 mins",
      difficulty: "Easy",
      category: "Breakfast",
      favorite: false,
    },
    {
      id: 5,
      title: "Vegetable Stir Fry with Tofu",
      image: "/placeholder.svg?height=200&width=300&text=Stir+Fry",
      time: "20 mins",
      difficulty: "Medium",
      category: "Dinner",
      favorite: false,
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("All")
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)

  const filteredRecipes = savedRecipes.filter((recipe) => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "All" || recipe.category === filterCategory
    const matchesFavorite = !showFavoritesOnly || recipe.favorite

    return matchesSearch && matchesCategory && matchesFavorite
  })

  const toggleFavorite = (id) => {
    setSavedRecipes(
      savedRecipes.map((recipe) => (recipe.id === id ? { ...recipe, favorite: !recipe.favorite } : recipe)),
    )
  }

  const removeRecipe = (id) => {
    setSavedRecipes(savedRecipes.filter((recipe) => recipe.id !== id))
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Saved Recipes</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="relative flex-1">
            <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search recipes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
            >
              <option value="All">All Categories</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
              <option value="Snack">Snack</option>
              <option value="Dessert">Dessert</option>
            </select>

          </div>
        </div>

        {filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe) => (
              <div key={recipe.id} className="border rounded-lg">
                <div className="h-40 relative">
                  <img src={image || "/placeholder.svg"} alt={recipe.title} fill className="object-cover h-40 w-full" />
                </div>
                <div className="p-4">
                  <h3 className="font-medium mb-2">{recipe.title}</h3>
                  <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
                  </div>
                  <div className="flex justify-between items-center">
                    <a href="#" className="text-orange-500 hover:text-orange-600 text-sm font-medium">
                      View Recipe
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-2">No recipes found.</p>
            <p className="text-sm text-gray-400">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>

    </div>
  )
}
