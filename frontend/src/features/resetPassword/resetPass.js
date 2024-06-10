import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { resetPassword } from "./resetPassApi"

export const useResetPassword =  (data) => {
  const navigate = useNavigate()
  const { mutate: resetPass, isLoading} = useMutation({
    mutationFn: (data) => resetPassword(data),

    onSuccess: (data) => {
      localStorage.setItem("brokangToken", data.token)
      toast.success("Password reset Successful")
      navigate("/")
    }
  })

  return {resetPass, isLoading}
}