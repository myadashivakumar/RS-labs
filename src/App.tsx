import { About } from './components/About'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Nav } from './components/Nav'
import { Products } from './components/Products'
import { Services } from './components/Services'
import { useReveal } from './hooks/useReveal'

export default function App() {
  useReveal()
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Services />
        <Products />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
