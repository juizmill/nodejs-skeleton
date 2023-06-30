import 'dotenv/config'
import 'reflect-metadata'
import app from '@modules/kernel'

const port = process.env.APP_PORT || 3000
app.listen(port, () => {
  console.log(`Server is running http://localhost:${port}`)
})
