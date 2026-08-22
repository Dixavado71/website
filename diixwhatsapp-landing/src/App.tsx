import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Features from './components/Features/Features'
import WhatsAppAutomation from './components/WhatsAppAutomation/WhatsAppAutomation'
import MultiTenant from './components/MultiTenant/MultiTenant'
import DashboardPreview from './components/DashboardPreview/DashboardPreview'
import Pricing from './components/Pricing/Pricing'
import FAQ from './components/FAQ/FAQ'
import Footer from './components/Footer/Footer'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <WhatsAppAutomation />
        <MultiTenant />
        <DashboardPreview />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}

export default App
