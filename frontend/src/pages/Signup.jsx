import React, { useState } from "react"
import { useAuthStrore } from "../store/useAuthStore"
import { MessageSquare, User } from "lucide-react"

const SignupPage = () => {

  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: ""
  })

  const [signup, setSigningUp] = useAuthStrore()

  const validateForm = () => {

  }

  const handleSubmite = (e) => {
    e.preventDefault()
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/*left side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                <MessageSquare className="size-6 font-bold"/>
              </div>
                <h1 className="text-2xl font-bold mt-2">Criar conta</h1>
                <p className="text-base-content/60">
                  Crie sua conta de graça e aproveite!
                </p>
            </div>
          </div>
          <form onSubmit={handleSubmite} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Nome completo</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-base-content/40"/>
                </div>
                <input 
                type="text"
                className={`input input-bordered w-full pl-10`}
                placeholder="nome completo"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                />
              </div>

            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignupPage