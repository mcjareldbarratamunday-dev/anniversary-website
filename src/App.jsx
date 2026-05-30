import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Sparkles, Clock, Mail, Camera, Calendar, Star } from 'lucide-react'
import AuroraDateScene from './AuroraDateScene'
import MemoryMuseum from './ShadowBoxGallery'

function App() {
  const [showAuroraScene, setShowAuroraScene] = useState(false)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const anniversaryDate = new Date('2025-05-28')
    
    const timer = setInterval(() => {
      const now = new Date()
      const difference = anniversaryDate - now
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const memories = [
    {
      date: "First Meeting",
      title: "The Day We Met",
      description: "The moment our eyes first met, I knew something special was about to begin.",
      icon: Sparkles,
      image: "/photo1.jpg"
    },
    {
      date: "First Date",
      title: "Our First Date",
      description: "Korean restaurant date, eating samyang noodles together. The start of our beautiful journey.",
      icon: Heart,
      image: "/photo3.jpg"
    },
    {
      date: "Monthsary",
      title: "First Monthsary",
      description: "30 days of loving you, and I knew I wanted many more months and years with you.",
      icon: Calendar,
      image: "/photo4.jpg"
    },
    {
      date: "Today",
      title: "One Year Together",
      description: "365 days of love, laughter, and growing together. You're my everything.",
      icon: Heart,
      image: "/photo5.jpg"
    }
  ]

  return (
    <div className="min-h-screen bg-cream">
      {/* Floating Hearts Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-romantic-pink opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          >
            <Heart size={20 + Math.random() * 30} fill="currentColor" />
          </motion.div>
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center z-10"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="mb-8"
          >
            <Heart size={100} className="text-romantic-rose mx-auto fill-current" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="font-dancing text-6xl md:text-8xl text-gradient mb-6"
          >
            Happy 1st Anniversary
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-2xl md:text-3xl text-gray-700 mb-4"
          >
            To the love of my life ❤️
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            365 days of loving you, and every day has been a blessing. 
            You make my world brighter just by being in it.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="#love-letter"
              className="bg-gradient-romantic text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transition-all duration-300 inline-block"
            >
              Read My Heart ❤️
            </a>
            <button
              onClick={() => setShowAuroraScene(true)}
              className="bg-white text-romantic-rose px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transition-all duration-300 inline-flex items-center gap-2 border-2 border-romantic-rose"
            >
              <Star size={20} className="fill-current" />
              Our Dream Date ✨
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Countdown Section */}
      <section className="py-20 px-4 bg-white/50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <Clock className="mx-auto mb-6 text-romantic-pink" size={60} />
          <h2 className="font-dancing text-5xl text-gradient mb-8">Time Since We've Been Together</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Days', value: timeLeft.days < 0 ? 365 : 365 - timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds }
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-4xl md:text-5xl font-bold text-romantic-rose mb-2">
                  {item.value}
                </div>
                <div className="text-gray-600 text-lg">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <Calendar className="mx-auto mb-6 text-romantic-pink" size={60} />
          <h2 className="font-dancing text-5xl text-gradient text-center mb-16">Our Love Story</h2>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-romantic rounded-full"></div>
            
            {memories.map((memory, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                    <div className="text-romantic-pink font-semibold mb-2">{memory.date}</div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{memory.title}</h3>
                    <p className="text-gray-600">{memory.description}</p>
                  </div>
                </div>
                
                <div className="absolute left-1/2 transform -translate-x-1/2 bg-romantic-rose p-3 rounded-full shadow-lg">
                  <memory.icon size={24} className="text-white" />
                </div>
                
                <div className={`w-1/2 ${index % 2 === 0 ? 'pl-8' : 'pr-8'}`}>
                  <div className="aspect-square rounded-2xl shadow-lg overflow-hidden bg-white">
                    <img 
                      src={memory.image} 
                      alt={memory.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Photo Gallery Section */}
      <section className="py-20 px-4 bg-white/50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <Camera className="mx-auto mb-6 text-romantic-pink" size={60} />
          <h2 className="font-dancing text-5xl text-gradient text-center mb-16">Our Precious Moments</h2>
          
          <MemoryMuseum />
        </motion.div>
      </section>

      {/* Love Letter Section */}
      <section id="love-letter" className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <Mail className="mx-auto mb-6 text-romantic-pink" size={60} />
          <h2 className="font-dancing text-5xl text-gradient text-center mb-16">Happy anniversary, baby. ❤️</h2>
          
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-romantic"></div>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                I don't really know where to start, but I want to tell you what's in my heart.
              </p>
              
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                First, thank you for staying with me.
              </p>
              
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                I know I'm not a perfect boyfriend. I get angry, I get frustrated, and sometimes I don't show you how much I love and appreciate you. I know there were times when I hurt you, disappointed you, or made things harder for you. But even after all that, you still chose to stay.
              </p>
              
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                You stayed when I was lost.
              </p>
              
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                You stayed when I didn't know what I was doing with my life.
              </p>
              
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                You stayed when I had nothing to offer but my love.
              </p>
              
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                And I don't think I'll ever be able to explain how much that means to me.
              </p>
              
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Sometimes I feel sad because right now, you're the one helping me. You're the one supporting me, comforting me, and taking care of me while I'm still trying to build my future. There are days when I wish I could give you more. I wish I could give you the life you deserve right now.
              </p>
              
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                But please believe me when I say that I notice everything you do.
              </p>
              
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                I notice every time you understand me even when I'm hard to understand.
              </p>
              
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                I notice every time you stay patient with me.
              </p>
              
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                I notice every sacrifice you make for us.
              </p>
              
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                I notice every time you choose me.
              </p>
              
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                And that makes me love you even more.
              </p>
              
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                You always ask me why I love you.
              </p>
              
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                The truth is, I don't love you because you're perfect.
              </p>
              
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                I love you because of the way you care for me.
              </p>
              
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                I love you because you stay when things get hard.
              </p>
              
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                I love you because you always try to understand me, even when I don't understand myself.
              </p>
              
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                I love you because you make me feel safe, loved, and accepted.
              </p>
              
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                I love you because when life gets heavy, you're the person I want to run to.
              </p>
              
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                And honestly, I think the biggest reason I love you is because you never gave up on me.
              </p>
              
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                When I was struggling, you believed in me.
              </p>
              
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                When I was lost, you stayed.
              </p>
              
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                When I felt like I had nothing, you still saw something good in me.
              </p>
              
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                That's why I love you.
              </p>
              
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                I may not have much right now, but I promise I'm trying. I'm trying because I want a better future for us. I want the day to come when I can finally give back all the love, care, and support you've given me.
              </p>
              
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Because honestly, if one day I become successful, a big part of that will be because of you.
              </p>
              
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                You believed in me when I was struggling.
              </p>
              
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                You stayed when things weren't easy.
              </p>
              
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                You loved me when I wasn't at my best.
              </p>
              
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                And I'll never forget that.
              </p>
              
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Thank you for being my safe place when life feels heavy.
              </p>
              
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Thank you for being the person who never gave up on me.
              </p>
              
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Thank you for loving me every day, even when I didn't make it easy.
              </p>
              
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                I love you so much, baby.
              </p>
              
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                More than anything, I hope you know that meeting you was one of the best things that ever happened to me.
              </p>
              
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                And if someone asks me what the best thing in my life is, my answer will always be the same:
              </p>
              
              <p className="text-gray-700 text-lg leading-relaxed font-dancing text-3xl text-romantic-rose mb-6">
                It's you. ❤️
              </p>
              
              <p className="text-gray-700 text-lg leading-relaxed font-dancing text-2xl text-romantic-rose">
                Happy anniversary.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gradient-romantic text-white text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Heart className="mx-auto mb-4 animate-heartbeat" size={40} fill="currentColor" />
          <p className="font-dancing text-3xl mb-2">Happy Anniversary, My Love</p>
          <p className="text-white/80">Made with ❤️ just for you</p>
        </motion.div>
      </footer>
      
      {/* 3D Aurora Date Scene Modal */}
      <AnimatePresence>
        {showAuroraScene && (
          <AuroraDateScene onClose={() => setShowAuroraScene(false)} />
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
