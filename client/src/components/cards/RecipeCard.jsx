import React from 'react'
import image from '../../assets/home-page/food1.webp'

export default function RecipeCard({ title, recipeId}) {
  return (
                <div key={index} className="overflow-hidden">
                  <div className="rounded-lg overflow-hidden mb-3">
                    <img
                      src={image || "/placeholder.svg"}
                      alt={title}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1">{title}</h3>

                  <div className="flex justify-between items-center">
                    <a href={`/recipe/${recipeId}`} className="text-green-600 hover:text-green-700 text-sm font-medium">
                      View Recipe
                    </a>
                  </div>
                </div>
  )
}
