import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Palette, Camera, Type, User, Search, Check, Sparkles, Upload, ChevronLeft, ChevronRight } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import api from "@/lib/axios"
import { Link } from "react-router-dom"

interface AvatarResult {
  id: number
  name: string
  image: string
  type: string
}

interface PaginationInfo {
  current_page: number
  has_next_page: boolean
  last_visible_page: number
}

export default function ProfilePage() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  
  // Avatar search state
  const [avatarResults, setAvatarResults] = useState<AvatarResult[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [searchType, setSearchType] = useState<"character" | "anime">("character")
  const [selectedAvatar, setSelectedAvatar] = useState<AvatarResult | null>(null)
  const [searching, setSearching] = useState(false)
  const [pagination, setPagination] = useState<PaginationInfo | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  
  // Tab state
  const [activeTab, setActiveTab] = useState<'avatar' | 'upload'>('avatar')
  
  const { toast } = useToast()

  const tabs = [
    { id: 'avatar', label: 'Avatar', icon: User },
    { id: 'upload', label: 'Upload', icon: Camera },
  ]

  // Fetch current avatar on component mount
  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const res = await api.get("/api/profile/profile/avatar");
        // Handle both possible response formats
        const avatarUrl = res.data.avatarUrl || res.data.avatar || res.data.profilePicture;
        if (avatarUrl) {
          setPreview(avatarUrl);
        }
      } catch (err) {
        console.error("Error fetching avatar:", err);
      }
    }
    fetchAvatar();
  }, [])

  // Search for anime avatars using Jikan API via backend
  const searchAvatars = async (page: number = 1) => {
    if (!searchQuery.trim()) {
      toast({
        title: "Please enter a search term",
        variant: "destructive"
      })
      return
    }

    setSearching(true)
    try {
      const response = await api.get(`/api/profile/avatar`, {
        params: {
          query: searchQuery,
          type: searchType,
          page: page.toString()
        }
      })
      setAvatarResults(response.data.results)
      setPagination(response.data.pagination)
      setCurrentPage(page)
    } catch (err: any) {
      console.error("Error searching avatars:", err)
      const errorMsg = err.response?.data?.msg || "Failed to search avatars"
      toast({
        title: errorMsg,
        variant: "destructive"
      })
    } finally {
      setSearching(false)
    }
  }

  // Save selected avatar to profile
  const saveAvatar = async () => {
    if (!selectedAvatar) {
      toast({
        title: "Please select an avatar first",
        variant: "destructive"
      })
      return
    }

    setUploading(true)
    try {
      const response = await api.put("/api/profile/profile/avatar", {
        avatarId: selectedAvatar.id.toString(),
        avatarUrl: selectedAvatar.image,
        avatarName: selectedAvatar.name,
      })
      
      // Update preview with the saved avatar
      setPreview(selectedAvatar.image)
      
      toast({
        title: "Avatar updated successfully! ✨"
      })
    } catch (err) {
      console.error("Error saving avatar:", err)
      toast({
        title: "Failed to save avatar",
        variant: "destructive"
      })
    } finally {
      setUploading(false)
    }
  }

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      // Create local preview
      const previewUrl = URL.createObjectURL(selectedFile)
      setPreview(previewUrl)
      setSelectedAvatar(null)
    }
  }

  // Upload custom profile picture
  const handleUpload = async () => {
    if (!file) {
      toast({
        title: "Please select a file first",
        variant: "destructive"
      })
      return
    }

    const formData = new FormData()
    formData.append("profilePic", file)

    setUploading(true)
    try {
      const response = await api.put("/api/profile/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      })
      
      // Update preview with the uploaded image URL from response
      // Check for various possible response formats
      const uploadedUrl = response.data.avatarUrl || 
                         response.data.avatar || 
                         response.data.profilePicture || 
                         response.data.url;
      
      if (uploadedUrl) {
        setPreview(uploadedUrl);
      }
      
      toast({
        title: "Profile picture updated! 📸"
      })
      setSelectedAvatar(null)
      setFile(null) // Clear the file after successful upload
    } catch (err: any) {
      console.error("Error uploading profile:", err)
      toast({
        title: "Failed to upload profile picture",
        variant: "destructive"
      })
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* nav bar that point towards the dashboard */}
      <nav className="border-b border-slate-800/50 backdrop-blur-xl bg-slate-900/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-blue-500" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Reflectify Me
              </span>
            </Link>
            <Link to="/dashboard">
              <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* avatar user profile */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl" />
        </div>

        {/* Header */}
        <div className="text-center mb-12 relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-blue-300">Customize Your Experience</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent mb-3">
            Profile Settings
          </h1>
          <p className="text-slate-400 text-lg">Make Reflectify truly yours</p>
        </div>

        {/* Current Avatar Preview */}
        <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <Avatar className="w-32 h-32 ring-4 ring-blue-500/20 ring-offset-4 ring-offset-slate-900">
                  <AvatarImage src={preview || undefined} alt="Profile" />
                  <AvatarFallback className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white text-3xl">
                    YOU
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center ring-4 ring-slate-900">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6 p-1 bg-slate-900/50 rounded-xl border border-slate-800">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`
                flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300
                ${activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50'}
              `}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {/* Avatar Search Tab */}
        {activeTab === 'avatar' && (
          <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Choose Your Avatar</h3>
                  <p className="text-slate-400">Search for your favorite anime character</p>
                </div>

                {/* Search Controls */}
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <Input
                      placeholder="Search characters or anime..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && searchAvatars()}
                      className="pl-10 bg-slate-800/50 italic border-slate-700 text-white placeholder:text-slate-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="flex gap-3">
                    <select
                      value={searchType}
                      onChange={(e) => setSearchType(e.target.value as "character" | "anime")}
                      className="px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white text-sm focus:border-blue-500 outline-none"
                      title="Search type"
                      aria-label="Search type"
                    >
                      <option value="character">Characters</option>
                      <option value="anime">Anime</option>
                    </select>

                    <Button
                      onClick={() => searchAvatars(1)}
                      disabled={searching}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500"
                    >
                      {searching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                      {searching ? "Searching..." : "Search"}
                    </Button>
                  </div>
                </div>

                {/* Avatar Grid */}
                {avatarResults.length > 0 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                      {avatarResults.map((avatar) => (
                        <button
                          key={avatar.id}
                          onClick={() => setSelectedAvatar(avatar)}
                          className={`
                            relative group rounded-xl overflow-hidden aspect-square transition-all duration-300
                            ${selectedAvatar?.id === avatar.id
                              ? 'ring-2 ring-blue-500 ring-offset-2 ring-offset-slate-900 scale-105'
                              : 'hover:scale-105'}
                          `}
                        >
                          <img
                            src={avatar.image}
                            alt={avatar.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                            <p className="absolute bottom-2 left-2 right-2 text-xs text-white font-medium truncate">
                              {avatar.name}
                            </p>
                          </div>
                          {selectedAvatar?.id === avatar.id && (
                            <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>

                    {/* Pagination */}
                    {pagination && (
                      <div className="flex items-center justify-between pt-4">
                        <Button
                          onClick={() => searchAvatars(currentPage - 1)}
                          disabled={currentPage === 1 || searching}
                          variant="outline"
                          size="sm"
                          className="border-slate-700 text-slate-300 hover:bg-slate-800"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </Button>
                        
                        <span className="text-sm text-slate-400">
                          Page {currentPage} of {pagination.last_visible_page}
                        </span>

                        <Button
                          onClick={() => searchAvatars(currentPage + 1)}
                          disabled={!pagination.has_next_page || searching}
                          variant="outline"
                          size="sm"
                          className="border-slate-700 text-slate-300 hover:bg-slate-800"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    )}

                    {/* Save Avatar Button */}
                    {selectedAvatar && (
                      <div className="pt-4 space-y-3">
                        <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                          <p className="text-sm text-blue-300">
                            <span className="font-medium">Selected:</span> {selectedAvatar.name}
                          </p>
                        </div>
                        <Button
                          onClick={saveAvatar}
                          disabled={uploading}
                          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500"
                        >
                          {uploading ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Saving...
                            </>
                          ) : (
                            <>
                              <Check className="w-4 h-4 mr-2" />
                              Save Avatar
                            </>
                          )}
                        </Button>
                      </div>
                    )}
                  </div>
                )}

                {/* Empty State */}
                {avatarResults.length === 0 && !searching && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-800/50 flex items-center justify-center">
                      <Search className="w-8 h-8 text-slate-600" />
                    </div>
                    <p className="text-slate-400">
                      Search for your favorite anime character to use as your avatar
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Upload Tab */}
        {activeTab === 'upload' && (
          <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Upload Custom Picture</h3>
                  <p className="text-slate-400">Use your own photo as profile picture</p>
                </div>

                <div className="space-y-4">
                  <Label
                    htmlFor="file-upload"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-slate-700 rounded-xl cursor-pointer bg-slate-800/30 hover:bg-slate-800/50 transition-colors"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-12 h-12 text-slate-500 mb-4" />
                      <p className="mb-2 text-sm text-slate-400">
                        <span className="font-semibold">Click to upload</span>
                      </p>
                      <p className="text-xs text-slate-500">PNG, JPG up to 5MB</p>
                    </div>
                    <Input
                      id="file-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </Label>

                  {file && (
                    <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Camera className="w-5 h-5 text-blue-400" />
                        <div>
                          <p className="text-sm font-medium text-white">{file.name}</p>
                          <p className="text-xs text-slate-400">{(file.size / 1024).toFixed(1)} KB</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <Button
                    onClick={handleUpload}
                    disabled={!file || uploading}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500"
                  >
                    {uploading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Picture
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Footer Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-slate-500">
            <Sparkles className="w-4 h-4 inline-block mr-1" />
            Changes are saved automatically
          </p>
        </div>
      </div>
    </div>
  )
}