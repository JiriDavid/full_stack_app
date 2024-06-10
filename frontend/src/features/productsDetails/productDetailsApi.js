import agent from "../../app/agent"

export const productDetails = async (id) => { 
  try {
    const response = await agent.Product.getProductDeatils(id)
    return response.Product
  } catch (error) {
    throw error
  }
}