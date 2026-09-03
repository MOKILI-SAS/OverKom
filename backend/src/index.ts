import { app } from './app.js'

const PORT = Number(process.env.PORT ?? 8787)

app.listen(PORT, () => {
  console.log(`OverKom API ready on http://127.0.0.1:${PORT}`)
})
