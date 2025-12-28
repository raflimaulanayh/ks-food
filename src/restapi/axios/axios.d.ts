interface ApiResponse<T = undefined> {
  data?: T
  status: number
  response: {
    data?: {
      message: string
      error: string
      statusCode: number
    }
  }
}
