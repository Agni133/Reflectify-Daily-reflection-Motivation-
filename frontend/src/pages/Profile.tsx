import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Toast } from "@/components/ui/toast"

export default function ProfilePage() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
   

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setPreview(URL.createObjectURL(selectedFile))
    }
  }

  const handleUpload = () => {
    if (!file) {
      Toast({
        title: "No Selected File",
        variant: "destructive",
    })
      return
    }
 
    Toast({
      title: "Profile updated",
    })
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-4">
      <Card className="w-full max-w-md border border-slate-700 shadow-2xl bg-slate-900/80 backdrop-blur-xl rounded-2xl">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-semibold text-white">Profile Settings</CardTitle>
          <p className="text-sm text-slate-400">Manage your personal info</p>
        </CardHeader>

        <CardContent className="flex flex-col items-center gap-6">
          {/* Avatar with Glow */}
          <div className="relative">
            <Avatar className="w-28 h-28 ring-4 ring-blue-600 shadow-lg shadow-blue-500/30">
              <AvatarImage src={preview || "/default-avatar.png"} alt="Profile" />
              <AvatarFallback>YOU</AvatarFallback>
            </Avatar>
          </div>

          {/* Upload Input */}
          <div className="w-full space-y-2 text-center text-white" >
            <Label htmlFor="picture" className="text-slate-300 text-center">
              Upload new picture
            </Label>
            <Input
              id="picture"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="text-white border-slate-700 bg-slate-800 focus-visible:ring-blue-500 "
            />
          </div>

          {/* Save Button */}
          <Button
            className="w-full bg-gradient-to-br  from-blue-900 to-indigo-900 hover:from-blue-900 hover:to-indigo-500 text-white font-medium shadow-md shadow-indigo-500/30 rounded-xl"
            onClick={handleUpload}
          >
            Save Changes
          </Button>
           {file && (
    <p className="text-xs text-slate-400 mt-1 truncate">
      {file.name}
    </p>
  )}
        </CardContent>
      </Card>
    </div>
  )
}
