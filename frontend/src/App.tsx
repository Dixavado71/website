import { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Features from './components/Features/Features'
import WhatsAppAutomation from './components/WhatsAppAutomation/WhatsAppAutomation'
import MultiTenant from './components/MultiTenant/MultiTenant'
import DashboardPreview from './components/DashboardPreview/DashboardPreview'
import Pricing from './components/Pricing/Pricing'
import FAQ from './components/FAQ/FAQ'
import Footer from './components/Footer/Footer'
import { SignupModal } from './components/SignupModal/SignupModal'
import './App.css'

function App() {
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Navbar onOpenSignup={() => setIsSignupModalOpen(true)} />
      <main>
        <Hero onOpenSignup={() => setIsSignupModalOpen(true)} />
        <Features />
        <WhatsAppAutomation />
        <MultiTenant />
        <DashboardPreview />
        <Pricing onOpenSignup={() => setIsSignupModalOpen(true)} />
        <FAQ />
      </main>
      <Footer />
      <SignupModal isOpen={isSignupModalOpen} onClose={() => setIsSignupModalOpen(false)} />
    </div>
  )
}

export default App
