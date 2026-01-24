import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Loader2, 
  Palette, 
  Camera, 
  Type, 
  User, 
  Search, 
  Check, 
  Sparkles,
  Upload,
  ChevronLeft,
  ChevronRight
} from "lucide-react"
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
 
  const [uploading, setUploading] = useState<boolean>(false)

  // Avatar search state
  const [avatarResults, setAvatarResults] = useState<AvatarResult[]>([])
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [searchType, setSearchType] = useState<"character" | "anime">("character")
  const [selectedAvatar, setSelectedAvatar] = useState<AvatarResult | null>(null)
  const [searching, setSearching] = useState<boolean>(false)
  const [pagination, setPagination] = useState<PaginationInfo | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(1)
  
  // Tab state
  const [activeTab, setActiveTab] = useState<'avatar' | 'theme' | 'fonts' | 'upload'>('avatar')
  
  // Theme & Font state
  const [selectedTheme, setSelectedTheme] = useState<string>("dark")
  const [selectedFont, setSelectedFont] = useState<string>("inter")
  const [savingPrefs, setSavingPrefs] = useState<boolean>(false)
  
  const { toast } = useToast()

  const themes = [
    { id: 'dark', name: 'Midnight', colors: ['#0f172a', '#1e293b', '#334155'], emoji: '🌙' },
    { id: 'purple', name: 'Purple Dream', colors: ['#4c1d95', '#6d28d9', '#8b5cf6'], emoji: '💜' },
    { id: 'ocean', name: 'Ocean Blue', colors: ['#0c4a6e', '#0369a1', '#0ea5e9'], emoji: '🌊' },
    { id: 'sunset', name: 'Sunset', colors: ['#991b1b', '#dc2626', '#f97316'], emoji: '🌅' },
    { id: 'forest', name: 'Forest', colors: ['#14532d', '#16a34a', '#4ade80'], emoji: '🌲' },
    { id: 'sakura', name: 'Sakura', colors: ['#831843', '#db2777', '#f9a8d4'], emoji: '🌸' },
  ]

  const fonts = [
    { id: 'inter', name: 'Inter', sample: 'The quick brown fox', style: 'font-sans' },
    { id: 'poppins', name: 'Poppins', sample: 'The quick brown fox', style: 'font-sans' },
    { id: 'roboto', name: 'Roboto', sample: 'The quick brown fox', style: 'font-sans' },
    { id: 'merriweather', name: 'Merriweather', sample: 'The quick brown fox', style: 'font-serif' },
    { id: 'playfair', name: 'Playfair Display', sample: 'The quick brown fox', style: 'font-serif' },
  ]

  const tabs = [
    { id: 'avatar', label: 'Avatar', icon: User },
    { id: 'upload', label: 'Upload', icon: Camera },
    { id: 'theme', label: 'Theme', icon: Palette },
    { id: 'fonts', label: 'Fonts', icon: Type },
  ]

  // Search for anime avatars using Jikan API via backend
  const searchAvatars = async (page: number = 1) => {
    if (!searchQuery.trim()) {
      toast({ title: "Please enter a search term", variant: "destructive" })
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
    } catch (err:any) {
      console.error("Error searching avatars:", err)
      const errorMsg = err.response?.data?.msg || "Failed to search avatars"
      toast({ title: errorMsg, variant: "destructive" })
    } finally {
      setSearching(false)
    }
  }
   
    // on refreshing the profile fetch and retain the avatar 
    useEffect(() => {
      const fetchAvatar = async () => {
        try {
          const res = await api.get("/api/profile/profile/avatar"); 
          setPreview(res.data.avatarUrl);
        } catch (err) {
          console.error("Error fetching avatar:", err);
        }
      }
      fetchAvatar(); 
    }, [])


  // Save selected avatar to profile
  const saveAvatar = async () => {
    if (!selectedAvatar) {
      toast({ title: "Please select an avatar first", variant: "destructive" })
      return
    }
    setUploading(true)
    try {
      await api.put("/api/profile/profile/avatar", {
        avatarId: selectedAvatar.id.toString(),
        avatarUrl: selectedAvatar.image,
        avatarName: selectedAvatar.name,
      })
      
      setPreview(selectedAvatar.image)
      toast({ title: "Avatar updated successfully! ✨" })
    } catch (err) {
      console.error("Error saving avatar:", err)
      toast({ title: "Failed to save avatar", variant: "destructive" })
    } finally {
      setUploading(false)
    }
  }

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setPreview(URL.createObjectURL(selectedFile))
      setSelectedAvatar(null)
    }
  }

  // Upload custom profile picture
  const handleUpload = async () => {
    if (!file) {
      toast({ title: "Please select a file first", variant: "destructive" })
      return
    }

    const formData = new FormData()
    formData.append("profilePic", file)

    setUploading(true)
    try {
      await api.put("/api/profile/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      })
      
      toast({ title: "Profile picture updated! 📸" })
      setSelectedAvatar(null)
    } catch (err) {
      console.error("Error uploading profile:", err)
      toast({ title: "Failed to upload profile picture", variant: "destructive" })
    } finally {
      setUploading(false)
    }
  }

  // Save theme preference
  const saveTheme = async (themeId: string) => {
    setSelectedTheme(themeId)
    setSavingPrefs(true)
    try {
      await api.put("/api/profile/profile/theme", { theme: themeId })
      toast({ title: `Theme updated to ${themes.find(t => t.id === themeId)?.name}! 🎨` })
    } catch (err) {
      console.error("Error saving theme:", err)
      toast({ title: "Failed to save theme", variant: "destructive" })
    } finally {
      setSavingPrefs(false)
    }
  }

  // Save font preference
  const saveFont = async (fontId: string) => {
    setSelectedFont(fontId)
    setSavingPrefs(true)
    try {
      await api.put("/api/profile/profile/font", { fontStyle: fontId })
      toast({ title: `Font updated to ${fonts.find(f => f.id === fontId)?.name}! ✍️` })
    } catch (err) {
      console.error("Error saving font:", err)
      toast({ title: "Failed to save font", variant: "destructive" })
    } finally {
      setSavingPrefs(false)
    }
  }

  return (
    
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-4 md:p-8">
   {/* nav bar that point towards the dashboard */}
       <header className="w-full  px-2 py-1 border-b border-slate-800 bg-slate-900/70 backdrop-blur-md">
         <div className="flex items-center px-2 space-x-9 justify-between  max-w-11xl mx-auto">
          <div className="italic text-center font-bold text-3xl text-white justify-between items-center">
            Reflectify Me 
          </div>
          <nav className="flex flex-row space-x-9 items-center justify-between italic font-bold text-slate-300">
           <Link to = "/dashboard">Dashboard</Link>
      
           {/* avatar user profile  */} 
               <img src ={ preview || selectedAvatar?.image||"/default-avatar.png"} alt="profile pic"
               className="w-9 h-9 rounded-full object-cover ring-2 ring-transparent hover:ring-green-500 transition" 
              />
          </nav>
          </div>
        </header> <br/>
   
   
      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>


      <div className="relative max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-white/10 mb-4">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-slate-300">Customize Your Experience</span>
          </div>
          <h1 className="text-3xl md:text-2xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
            Profile Settings
          </h1> 
          <p className="text-slate-400 mt-2">Make Reflectify truly yours</p>
        </div>

        {/* Current Avatar Preview */}
        <div className="flex justify-center mb-8">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300" />
            <Avatar className="relative w-24 h-24 ring-4 ring-slate-800">
              <AvatarImage src={preview || selectedAvatar?.image || "/default-avatar.png"} alt="Profile" />
              <AvatarFallback className="bg-slate-800 text-2xl">YOU</AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex bg-slate-800/50 rounded-2xl p-1.5 border border-slate-700/50 backdrop-blur-xl">
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
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <Card className="border border-slate-700/50 bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-2xl">
          <CardContent className="p-6">
            
            {/* Avatar Search Tab */}
            {activeTab === 'avatar' && (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold italic text-white mb-1">Choose Your Avatar</h3>
                  <p className="text-sm text-slate-400 italic ">Search for your favorite anime character</p>
                </div>

                {/* Search Controls */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      placeholder="Search anime characters..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && searchAvatars()}
                      className="pl-10 bg-slate-800/50 italic  border-slate-700 text-white placeholder:text-slate-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div className="flex gap-2">
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
                      {searching ? <Loader2 className="w-4 h-4 animate-spin" /> : "Search"}
                    </Button>
                  </div>
                </div>

                {/* Avatar Grid */}
                {avatarResults.length > 0 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
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
                            <span className="absolute bottom-1 left-1 right-1 text-xs text-white truncate">
                              {avatar.name}
                            </span>
                          </div>
                          {selectedAvatar?.id === avatar.id && (
                            <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                              <Check className="w-6 h-6 text-blue-400" />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>

                    {/* Pagination */}
                    {pagination && (
                      <div className="flex items-center justify-center gap-4">
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={currentPage === 1}
                          onClick={() => searchAvatars(currentPage - 1)}
                          className="border-slate-700 text-slate-300 hover:bg-slate-800"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <span className="text-sm text-slate-400">
                          Page {currentPage} of {pagination.last_visible_page}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={!pagination.has_next_page}
                          onClick={() => searchAvatars(currentPage + 1)}
                          className="border-slate-700 text-slate-300 hover:bg-slate-800"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    )}

                    {/* Save Avatar Button */}
                    {selectedAvatar && (
                      <div className="flex flex-col items-center gap-2 pt-4 border-t border-slate-700/50">
                        <p className="text-sm text-slate-400">
                          Selected: <span className="text-white font-medium">{selectedAvatar.name}</span>
                        </p>
                        <Button
                          onClick={saveAvatar}
                          disabled={uploading}
                          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 px-8"
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
                  <div className="text-center  italic py-12 text-slate-500">
                    <User className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Search for your favorite anime character to use as your avatar</p>
                  </div>
                )}
              </div>
            )}

            {/* Upload Tab */}
            {activeTab === 'upload' && (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold italic text-white mb-1">Upload Custom Picture</h3>
                  <p className="text-sm text-slate-400">Use your own photo as profile picture</p>
                </div>

                <div className="max-w-sm mx-auto space-y-4">
                  <Label
                    htmlFor="picture"
                    className="flex flex-col items-center gap-3 p-8 border-2 border-dashed border-slate-700 rounded-2xl cursor-pointer hover:border-blue-500/50 hover:bg-slate-800/30 transition-all"
                  >
                    <div className="p-4 bg-slate-800 rounded-full">
                      <Upload className="w-8 h-8 text-blue-400" />
                    </div>
                    <div className="text-center">
                      <p className="text-white font-medium">Click to upload</p>
                      <p className="text-sm text-slate-400">PNG, JPG up to 5MB</p>
                    </div>
                    <Input
                      id="picture"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </Label>

                  {file && (
                    <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-xl">
                      <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={preview || ''} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white truncate">{file.name}</p>
                        <p className="text-xs text-slate-400">{(file.size / 1024).toFixed(1)} KB</p>
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
                        <Camera className="w-4 h-4 mr-2" />
                        Upload Picture
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}

            {/* Theme Tab */}
            {activeTab === 'theme' && (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold italic  text-white mb-1">Choose Your Theme</h3>
                  <p className="text-sm text-slate-400">Personalize the look and feel</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {themes.map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => saveTheme(theme.id)}
                      disabled={savingPrefs}
                      className={`
                        relative p-4 rounded-2xl border-2 transition-all duration-300 text-left
                        ${selectedTheme === theme.id 
                          ? 'border-blue-500 bg-blue-500/10' 
                          : 'border-slate-700/50 hover:border-slate-600 bg-slate-800/30'}
                      `}
                    >
                      {/* Color preview */}
                      <div className="flex gap-1 mb-3">
                        {theme.colors.map((color, i) => (
                          <div
                            key={i}
                            className="w-6 h-6 rounded-full ring-2 ring-slate-900"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{theme.emoji}</span>
                        <span className="text-white font-medium">{theme.name}</span>
                      </div>

                      {selectedTheme === theme.id && (
                        <div className="absolute top-2 right-2">
                          <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Fonts Tab */}
            {activeTab === 'fonts' && (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-white mb-1">Choose Your Font</h3>
                  <p className="text-sm text-slate-400">Select a typeface that feels right</p>
                </div>

                <div className="grid gap-3">
                  {fonts.map((font) => (
                    <button
                      key={font.id}
                      onClick={() => saveFont(font.id)}
                      disabled={savingPrefs}
                      className={`
                        flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-300
                        ${selectedFont === font.id 
                          ? 'border-blue-500 bg-blue-500/10' 
                          : 'border-slate-700/50 hover:border-slate-600 bg-slate-800/30'}
                      `}
                    >
                      <div>
                        <p className={`text-white font-medium ${font.style}`}>{font.name}</p>
                        <p className={`text-sm text-slate-400 ${font.style}`}>{font.sample}</p>
                      </div>
                      
                      {selectedFont === font.id && (
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

          </CardContent>
        </Card>

        {/* Footer Info */}
        <p className="text-center text-slate-500 text-sm mt-6">
          Changes are saved automatically
        </p>
      </div>
    </div>
  )
}