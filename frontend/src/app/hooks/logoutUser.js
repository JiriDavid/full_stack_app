import { useMutation, useQueryClient } from "@tanstack/react-query"
import { logoutUser } from "../api/logoutUserApi"
import { useNavigate } from "react-router-dom"

export const useLogout = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const {mutate: logout} = useMutation({
    mutationFn: logoutUser,
    onSuccess: (data) =>{
   queryClient.invalidateQueries({
    queryKey: ["user"],
   })
   queryClient.resetQueries()
   localStorage.removeItem("brokangToken")
   if(data.success){
      navigate("/")
   }
    }
  })

  return { logout }
}