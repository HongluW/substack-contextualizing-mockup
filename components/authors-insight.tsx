import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button" // Import Button
import { Card, CardContent } from "@/components/ui/card"

export function AuthorsInsight() {
  const authors = [
    {
      name: "Marsh McWuhan",
      handle: "@marmcwuhan",
      avatar: "/placeholder.svg?height=48&width=48",
      articles: [
        { title: "Understanding Media: The Extensions of Man", date: "2 days ago" },
        { title: "Global Village", date: "1 week ago" },
      ],
    },
    {
      name: "Helen de Prasidunt",
      handle: "@helendc",
      avatar: "/placeholder.svg?height=48&width=48",
      articles: [{ title: "Can't take it with you", date: "3 days ago" }],
    },
    {
      name: "Justin E. H. Bieber",
      handle: "@JEHS",
      avatar: "/placeholder.svg?height=48&width=48",
      articles: [
        { title: "Hinternet", date: "4 days ago" },
        { title: "Autofiction Is All We’ve Ever Known", date: "3 weeks ago" },
      ],
    },
  ]

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4 text-white">Author's Insights</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {authors.map((author, index) => (
          <Card key={index} className="bg-[#2a2a2a] border border-gray-700 text-white">
            <CardContent className="p-4">
              {/* Author details, mirroring aNYthing Publication layout */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-12 h-12">
                    {" "}
                    {/* Changed to w-12 h-12 */}
                    <AvatarImage src={author.avatar || "/placeholder.svg"} alt={author.name} />
                    <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-white">{author.name}</h3>
                    <b className="text-gray-400 text-sm">{author.handle}</b>
                  </div>
                </div>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm">
                  Follow
                </Button>
              </div>
              {/* Featured writings, with block + title format */}
              <div className="space-y-2">
                {author.articles.map((article, artIndex) => (
                  <div key={artIndex} className="bg-[#1f1f1f] p-3 rounded-md hover:bg-[#252525] cursor-pointer">
                    <b className="font-semibold text-gray-400 text-base">{article.title}</b>
                    <p className="text-gray-500 text-xs mt-1">{article.date}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
