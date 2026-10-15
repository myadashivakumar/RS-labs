import { Capabilities } from './components/Capabilities'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Method } from './components/Method'
import { Nav } from './components/Nav'
import { Studio } from './components/Studio'
import { Work } from './components/Work'
import { useReveal } from './hooks/useReveal'

export default function App() {
  useReveal()
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Work />
        <Capabilities />
        <Method />
        <Studio />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
