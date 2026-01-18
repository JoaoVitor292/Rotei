import React, { useState, useRef } from 'react'
import {
  MapPin,
  Heart,
  Send,
  X,
  Menu,
  Instagram,
  Facebook,
  Phone,
  Check,
  User,
  Users,
  Globe,
  Award,
  Shield,
  Star
} from 'lucide-react'

// Dados dos locais turísticos com coordenadas para o mapa
const LUGARES = [
  {
    id: 1,
    nome: 'Cristo Redentor',
    categoria: 'Pontos turísticos',
    descricao:
      'Uma das 7 maravilhas do mundo moderno com vista panorâmica da cidade',
    imagem:
      'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800&q=80',
    coords: { x: 52, y: 45 }
  },
  {
    id: 2,
    nome: 'Pão de Açúcar',
    categoria: 'Pontos turísticos',
    descricao: 'Bondinho icônico com vista espetacular da Baía de Guanabara',
    imagem:
      'https://images.unsplash.com/photo-1544989164-fb2e48d9cd98?w=800&q=80',
    coords: { x: 70, y: 55 }
  },
  {
    id: 3,
    nome: 'Praia de Copacabana',
    categoria: 'Praias',
    descricao: 'A praia mais famosa do Rio com calçadão de mosaico português',
    imagem:
      'https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4?w=800&q=80',
    coords: { x: 60, y: 70 }
  },
  {
    id: 4,
    nome: 'Praia de Ipanema',
    categoria: 'Praias',
    descricao: 'Praia sofisticada com pôr do sol inesquecível',
    imagem:
      'https://images.unsplash.com/photo-1609881669751-19fd34372ed6?w=800&q=80',
    coords: { x: 50, y: 75 }
  },
  {
    id: 5,
    nome: 'Escadaria Selarón',
    categoria: 'Cultura',
    descricao: 'Obra de arte colorida com mais de 2000 azulejos de 60 países',
    imagem:
      'https://images.unsplash.com/photo-1587819838285-03cc04eae95e?w=800&q=80',
    coords: { x: 48, y: 50 }
  },
  {
    id: 6,
    nome: 'Parque Lage',
    categoria: 'Cultura',
    descricao: 'Palacete histórico com jardins e vista para o Cristo Redentor',
    imagem:
      'https://images.unsplash.com/photo-1621995961677-be38e5850e57?w=800&q=80',
    coords: { x: 55, y: 52 }
  },
  {
    id: 7,
    nome: 'Pedra da Gávea',
    categoria: 'Aventura/Trilhas',
    descricao: 'Trilha desafiadora com vista espetacular a 842m de altitude',
    imagem:
      'https://images.unsplash.com/photo-1589802829985-817e51171b92?w=800&q=80',
    coords: { x: 35, y: 60 }
  },
  {
    id: 8,
    nome: 'Floresta da Tijuca',
    categoria: 'Aventura/Trilhas',
    descricao: 'Maior floresta urbana do mundo com cachoeiras e trilhas',
    imagem:
      'https://images.unsplash.com/photo-1536514498073-50e69d39c6cf?w=800&q=80',
    coords: { x: 40, y: 40 }
  },
  {
    id: 9,
    nome: 'Lapa',
    categoria: 'Noite',
    descricao: 'Boemia carioca com samba, arcos e muita animação',
    imagem:
      'https://images.unsplash.com/photo-1621359854764-7f2ea6c39535?w=800&q=80',
    coords: { x: 45, y: 48 }
  },
  {
    id: 10,
    nome: 'Aprazível',
    categoria: 'Gastronomia',
    descricao: 'Restaurante charmoso em Santa Teresa com culinária brasileira',
    imagem:
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    coords: { x: 42, y: 45 }
  },
  {
    id: 11,
    nome: 'Confeitaria Colombo',
    categoria: 'Gastronomia',
    descricao: 'Café histórico centenário no centro do Rio',
    imagem:
      'https://images.unsplash.com/photo-1559305616-3a6c6c58a15f?w=800&q=80',
    coords: { x: 50, y: 42 }
  },
  {
    id: 12,
    nome: 'Lagoa Rodrigo de Freitas',
    categoria: 'Pontos turísticos',
    descricao: 'Lagoa cercada por montanhas, perfeita para esportes e lazer',
    imagem:
      'https://images.unsplash.com/photo-1609881669751-19fd34372ed6?w=800&q=80',
    coords: { x: 48, y: 65 }
  }
]

const CATEGORIAS = [
  'Todos',
  'Pontos turísticos',
  'Aventura/Trilhas',
  'Praias',
  'Cultura',
  'Gastronomia',
  'Noite'
]

const App = () => {
  const [page, setPage] = useState('home')
  const [rota, setRota] = useState([])
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todos')
  const [menuAberto, setMenuAberto] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMsg, setToastMsg] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [userData, setUserData] = useState({
    nome: '',
    origem: '',
    pessoas: ''
  })

  const formCompleto =
    userData.nome.trim() !== '' &&
    userData.origem.trim() !== '' &&
    userData.pessoas.trim() !== ''

  const mostrarToast = (msg) => {
    setToastMsg(msg)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const adicionarRota = (lugar) => {
    if (!rota.find((l) => l.id === lugar.id)) {
      setRota([...rota, lugar])
      mostrarToast(`${lugar.nome} adicionado à rota!`)
    } else {
      removerRota(lugar.id)
    }
  }

  const removerRota = (id) => {
    setRota(rota.filter((l) => l.id !== id))
    mostrarToast('Local removido da rota')
  }

  const enviarWhatsApp = () => {
    if (!formCompleto) {
      mostrarToast('Preencha todos os dados antes de enviar!')
      return
    }

    const mensagem = `🗺️ *Roteiro Personalizado - Rio de Janeiro*

👤 *Nome:* ${userData.nome}
🌍 *De:* ${userData.origem}
👥 *Pessoas:* ${userData.pessoas}

📍 *Locais Selecionados:*
${rota.map((l, i) => `${i + 1}. ${l.nome}`).join('\n')}

✨ Criado via Rotei`

    const numeroWhatsApp = '5521999999999' // Substituir pelo número real
    const url = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${encodeURIComponent(mensagem)}`

    window.open(url, '_blank')
    setShowModal(false)
    mostrarToast('Redirecionando para WhatsApp...')
  }

  const lugaresFiltrados =
    categoriaAtiva === 'Todos'
      ? LUGARES
      : LUGARES.filter((l) => l.categoria === categoriaAtiva)

  const jaAdicionado = (id) => rota.some((l) => l.id === id)

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-amber-50">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div
              className="text-2xl font-bold bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent cursor-pointer"
              onClick={() => setPage('home')}
            >
              Rotei
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
              <button
                onClick={() => setPage('home')}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Início
              </button>
              <button
                onClick={() => setPage('sobre')}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Sobre Nós
              </button>
              <button
                onClick={() => setPage('catalogo')}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Locais
              </button>
              <button
                onClick={() => setPage('rota')}
                className="relative flex items-center gap-2 px-4 py-2 bg-linear-to-r from-blue-600 to-cyan-500 text-white rounded-full hover:shadow-lg transition-all"
              >
                <Heart className="w-4 h-4" />
                Minha Rota
                {rota.length > 0 && (
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {rota.length}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setMenuAberto(!menuAberto)}
            >
              {menuAberto ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuAberto && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-2 space-y-2">
              <button
                onClick={() => {
                  setPage('home')
                  setMenuAberto(false)
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-50 rounded-lg"
              >
                Início
              </button>
              <button
                onClick={() => {
                  setPage('sobre')
                  setMenuAberto(false)
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-50 rounded-lg"
              >
                Sobre Nós
              </button>
              <button
                onClick={() => {
                  setPage('catalogo')
                  setMenuAberto(false)
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-50 rounded-lg"
              >
                Locais
              </button>
              <button
                onClick={() => {
                  setPage('rota')
                  setMenuAberto(false)
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-50 rounded-lg"
              >
                Minha Rota ({rota.length})
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Toast */}
      {showToast && (
        <div className="fixed top-20 right-4 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
          {toastMsg}
        </div>
      )}

      {/* Content */}
      <div className="pt-16">
        {page === 'home' && <Home setPage={setPage} />}
        {page === 'sobre' && <SobreNos />}
        {page === 'catalogo' && (
          <Catalogo
            lugares={lugaresFiltrados}
            categorias={CATEGORIAS}
            categoriaAtiva={categoriaAtiva}
            setCategoriaAtiva={setCategoriaAtiva}
            adicionarRota={adicionarRota}
            jaAdicionado={jaAdicionado}
          />
        )}
        {page === 'rota' && (
          <MinhaRota
            rota={rota}
            removerRota={removerRota}
            setShowModal={setShowModal}
            userData={userData}
            setUserData={setUserData}
            formCompleto={formCompleto}
          />
        )}
      </div>

      {/* Modal de Confirmação */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-2xl font-bold mb-4">Confirmar envio?</h3>
            <p className="text-gray-600 mb-2">
              Você selecionou {rota.length} locais
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Sua rota será enviada via WhatsApp para nossos guias
              especializados
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={enviarWhatsApp}
                className="flex-1 px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Enviar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-2xl font-bold">Rotei</div>
            <div className="flex gap-4">
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-green-400 transition-colors">
                <Phone className="w-6 h-6" />
              </a>
            </div>
          </div>
          <div className="text-center mt-6 text-gray-400 text-sm">
            © 2026 Rotei. Monte sua rota no Rio do seu jeito.
          </div>
        </div>
      </footer>
    </div>
  )
}

// Componente Home
const Home = ({ setPage }) => {
  return (
    <div className="min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Monte sua rota no{' '}
              <span className="bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Rio de Janeiro
              </span>
            </h1>
            <p className="text-xl text-gray-600">
              Descubra os melhores pontos turísticos, praias paradisíacas e
              experiências únicas. Crie seu roteiro personalizado com nossos
              guias profissionais.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setPage('catalogo')}
                className="px-8 py-4 bg-linear-to-r from-blue-600 to-cyan-500 text-white rounded-full text-lg font-semibold hover:shadow-xl transition-all transform hover:scale-105"
              >
                Começar Rota
              </button>
              <button
                onClick={() => setPage('sobre')}
                className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-full text-lg font-semibold hover:bg-blue-50 transition-all"
              >
                Conheça-nos
              </button>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800&q=80"
              alt="Cristo Redentor"
              className="rounded-3xl shadow-2xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-linear-to-r from-blue-600 to-cyan-500 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-bold">12+ Locais</div>
                  <div className="text-sm text-gray-600">Incríveis</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Componente Sobre Nós
const SobreNos = () => {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6">Sobre a Rotei</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Conectando turistas aos melhores destinos do Rio de Janeiro com
            experiência, profissionalismo e paixão pela cidade maravilhosa
          </p>
        </div>

        {/* Cards de Destaque */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
            <div className="w-16 h-16 bg-linear-to-r from-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center mb-6">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">5 Anos de Experiência</h3>
            <p className="text-gray-600">
              Desde 2020, ajudamos milhares de turistas a descobrirem o melhor
              do Rio de Janeiro com roteiros personalizados e inesquecíveis.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
            <div className="w-16 h-16 bg-linear-to-r from-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center mb-6">
              <Star className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Guias Profissionais</h3>
            <p className="text-gray-600">
              Nossa equipe é composta por guias turísticos certificados,
              apaixonados pelo Rio e preparados para oferecer a melhor
              experiência.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
            <div className="w-16 h-16 bg-linear-to-r from-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center mb-6">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Segurança e Confiança</h3>
            <p className="text-gray-600">
              Priorizamos sua segurança e conforto. Todos os nossos passeios são
              planejados com cuidado e atenção aos detalhes.
            </p>
          </div>
        </div>

        {/* Nossa História */}
        <div className="bg-linear-to-br from-blue-50 to-cyan-50 rounded-3xl p-12 mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-6">Nossa História</h3>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  A Rotei nasceu em 2020 com uma missão clara: transformar a
                  experiência de turistas no Rio de Janeiro através de roteiros
                  personalizados e guias especializados.
                </p>
                <p>
                  Ao longo desses 5 anos no mercado, nos consolidamos como
                  referência em turismo personalizado, sempre colocando a
                  satisfação e segurança dos nossos clientes em primeiro lugar.
                </p>
                <p>
                  Nossa equipe de guias turísticos profissionais conhece cada
                  canto da cidade maravilhosa e está preparada para criar
                  experiências únicas e memoráveis para você.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1544989164-fb2e48d9cd98?w=800&q=80"
                alt="Guia turístico"
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>

        {/* Nossos Diferenciais */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-12">
            Por que escolher a Rotei?
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-4 items-start bg-white p-6 rounded-xl shadow-md">
              <Check className="w-6 h-6 text-green-500 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-lg mb-2">
                  Roteiros Personalizados
                </h4>
                <p className="text-gray-600">
                  Monte seu próprio roteiro escolhendo os locais que mais deseja
                  conhecer
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start bg-white p-6 rounded-xl shadow-md">
              <Check className="w-6 h-6 text-green-500 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-lg mb-2">Guias Especializados</h4>
                <p className="text-gray-600">
                  Profissionais certificados com profundo conhecimento da cidade
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start bg-white p-6 rounded-xl shadow-md">
              <Check className="w-6 h-6 text-green-500 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-lg mb-2">Atendimento Ágil</h4>
                <p className="text-gray-600">
                  Resposta rápida via WhatsApp para tirar todas as suas dúvidas
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start bg-white p-6 rounded-xl shadow-md">
              <Check className="w-6 h-6 text-green-500 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-lg mb-2">Flexibilidade Total</h4>
                <p className="text-gray-600">
                  Adaptamos os passeios às suas preferências e necessidades
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Final */}
        <div className="bg-linear-to-r from-blue-600 to-cyan-500 rounded-3xl p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">
            Pronto para explorar o Rio?
          </h3>
          <p className="text-xl mb-8 text-blue-100">
            Monte seu roteiro personalizado agora e deixe que nossos guias
            profissionais cuidem do resto
          </p>
          <button className="px-8 py-4 bg-white text-blue-600 rounded-full text-lg font-semibold hover:shadow-2xl transition-all transform hover:scale-105">
            Começar Meu Roteiro
          </button>
        </div>
      </div>
    </div>
  )
}

// Componente Catálogo
const Catalogo = ({
  lugares,
  categorias,
  categoriaAtiva,
  setCategoriaAtiva,
  adicionarRota,
  jaAdicionado
}) => {
  const refs = useRef([])
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Descubra o Rio de Janeiro</h2>
        <p className="text-xl text-gray-600">
          Escolha os locais que deseja visitar e monte sua rota perfeita
        </p>
      </div>

      {/* Filtros */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide">
        {categorias.map((cat, i) => (
          <button
            key={cat}
            ref={(el) => (refs.current[i] = el)}
            onClick={() => {
              setCategoriaAtiva(cat)
              refs.current[i]?.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
              })
            }}
            className={`px-6 py-2 rounded-full whitespace-nowrap transition-all ${
              categoriaAtiva === cat
                ? 'bg-linear-to-r from-blue-600 to-cyan-500 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid de Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lugares.map((lugar) => (
          <CardLugar
            key={lugar.id}
            lugar={lugar}
            adicionado={jaAdicionado(lugar.id)}
            onClick={() => adicionarRota(lugar)}
          />
        ))}
      </div>
    </div>
  )
}

// Card de Lugar
const CardLugar = ({ lugar, adicionado, onClick }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1 cursor-pointer">
      <div className="relative h-48 overflow-hidden">
        <img
          src={lugar.imagem}
          alt={lugar.nome}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold">
            {lugar.categoria}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold mb-2">{lugar.nome}</h3>
        <p className="text-gray-600 text-sm mb-4">{lugar.descricao}</p>
        <button
          onClick={onClick}
          className={`w-full py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
            adicionado
              ? 'bg-green-500 text-white'
              : 'bg-linear-to-r from-blue-600 to-cyan-500 text-white hover:shadow-lg'
          }`}
        >
          {adicionado ? (
            <>
              <Check className="w-5 h-5" />
              Adicionado
            </>
          ) : (
            <>
              <Heart className="w-5 h-5" />
              Adicionar à Rota
            </>
          )}
        </button>
      </div>
    </div>
  )
}

// Componente Minimapa
const Minimapa = ({ rota, removerRota }) => {
  return (
    <div className="bg-linear-to-br from-blue-100 via-cyan-50 to-amber-50 rounded-2xl p-6 relative overflow-hidden shadow-lg">
      {/* Decorações de fundo */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-blue-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-cyan-200/30 rounded-full blur-3xl"></div>

      {/* Mapa estilizado do Rio */}
      <svg viewBox="0 0 100 100" className="w-full h-64 relative z-10">
        {/* Contorno simplificado do Rio */}
        <path
          d="M 10,50 Q 20,30 40,35 T 60,45 Q 70,50 80,60 L 85,80 Q 70,85 50,80 T 20,75 L 15,65 Z"
          fill="#E0F2FE"
          stroke="#0EA5E9"
          strokeWidth="0.5"
          className="drop-shadow-md"
        />

        {/* Água (mar/baía) */}
        <ellipse cx="75" cy="65" rx="15" ry="10" fill="#BAE6FD" opacity="0.6" />
        <ellipse cx="25" cy="72" rx="12" ry="8" fill="#BAE6FD" opacity="0.6" />

        {/* Montanhas estilizadas */}
        <path d="M 45,40 L 50,30 L 55,40 Z" fill="#94A3B8" opacity="0.4" />
        <path d="M 35,45 L 40,35 L 45,45 Z" fill="#94A3B8" opacity="0.3" />
        <path d="M 55,48 L 58,42 L 61,48 Z" fill="#94A3B8" opacity="0.3" />

        {/* Pontos da rota */}
        {rota.map((lugar, index) => (
          <g key={lugar.id}>
            {/* Linha conectando os pontos */}
            {index > 0 && (
              <line
                x1={rota[index - 1].coords.x}
                y1={rota[index - 1].coords.y}
                x2={lugar.coords.x}
                y2={lugar.coords.y}
                stroke="#0EA5E9"
                strokeWidth="0.8"
                strokeDasharray="2,2"
                opacity="0.6"
              />
            )}

            {/* Pin do local */}
            <g
              className="cursor-pointer hover:scale-110 transition-transform"
              onClick={() => removerRota(lugar.id)}
            >
              {/* Círculo externo pulsante */}
              <circle
                cx={lugar.coords.x}
                cy={lugar.coords.y}
                r="4"
                fill="#0EA5E9"
                opacity="0.3"
                className="animate-ping"
              />

              {/* Pin principal */}
              <circle
                cx={lugar.coords.x}
                cy={lugar.coords.y}
                r="2.5"
                fill="#0EA5E9"
                stroke="white"
                strokeWidth="0.5"
              />

              {/* Número do ponto */}
              <circle
                cx={lugar.coords.x}
                cy={lugar.coords.y - 5}
                r="3"
                fill="white"
                stroke="#0EA5E9"
                strokeWidth="0.5"
              />
              <text
                x={lugar.coords.x}
                y={lugar.coords.y - 3.5}
                fontSize="3"
                fontWeight="bold"
                fill="#0EA5E9"
                textAnchor="middle"
              >
                {index + 1}
              </text>
            </g>
          </g>
        ))}
      </svg>

      {/* Legenda */}
      <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-600">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span>Seus locais</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-0.5 bg-blue-500 opacity-60"></div>
          <span>Rota</span>
        </div>
      </div>
    </div>
  )
}

// Componente Minha Rota
const MinhaRota = ({
  rota,
  removerRota,
  setShowModal,
  userData,
  setUserData,
  formCompleto
}) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-4xl font-bold mb-8 text-center">
        Minha Rota Personalizada
      </h2>

      {/* Formulário de Dados */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <User className="w-5 h-5" />
          Seus Dados
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">
              Nome Completo
            </label>
            <input
              type="text"
              value={userData.nome}
              onChange={(e) =>
                setUserData({ ...userData, nome: e.target.value })
              }
              placeholder="Digite seu nome"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          <div>
            <label className="text-sm font-semibold mb-2 flex items-center gap-2">
              <Globe className="w-4 h-4" />
              De onde você é?
            </label>
            <input
              type="text"
              value={userData.origem}
              onChange={(e) =>
                setUserData({ ...userData, origem: e.target.value })
              }
              placeholder="Cidade, Estado ou País"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          <div>
            <label className="text-sm font-semibold mb-2 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Quantas pessoas?
            </label>
            <input
              type="text"
              value={userData.pessoas}
              onChange={(e) =>
                setUserData({ ...userData, pessoas: e.target.value })
              }
              placeholder="Ex: 2 adultos e 1 criança"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
        </div>
      </div>

      {rota.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
          <MapPin className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            Sua rota está vazia
          </h3>
          <p className="text-gray-500">
            Adicione locais para começar a montar seu roteiro
          </p>
        </div>
      ) : (
        <>
          <div className="bg-linear-to-r from-blue-600 to-cyan-500 text-white p-6 rounded-2xl mb-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold">{rota.length}</div>
                <div className="text-blue-100">locais selecionados</div>
              </div>
              <MapPin className="w-12 h-12 opacity-50" />
            </div>
          </div>

          {/* Minimapa */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              Mapa da Rota
            </h3>
            <Minimapa rota={rota} removerRota={removerRota} />
            <p className="text-sm text-center text-gray-500 mt-2">
              Clique nos pontos do mapa para remover da rota
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {rota.map((lugar, index) => (
              <div
                key={lugar.id}
                className="bg-white rounded-xl shadow-md p-4 flex items-center gap-4 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 bg-linear-to-r from-blue-600 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold shrink-0">
                  {index + 1}
                </div>
                <img
                  src={lugar.imagem}
                  alt={lugar.nome}
                  className="w-20 h-20 object-cover rounded-lg shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-lg">{lugar.nome}</h4>
                  <p className="text-sm text-gray-600">{lugar.categoria}</p>
                </div>
                <button
                  onClick={() => removerRota(lugar.id)}
                  className="p-2 hover:bg-red-50 rounded-lg transition-colors shrink-0"
                >
                  <X className="w-5 h-5 text-red-500" />
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={() => setShowModal(true)}
            disabled={!formCompleto}
            className={`w-full py-4 rounded-xl text-lg font-semibold flex items-center justify-center gap-3 transition-all ${
              formCompleto
                ? 'bg-green-500 text-white hover:bg-green-600 hover:shadow-xl transform hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Send className="w-5 h-5" />
            {formCompleto
              ? 'Enviar Rota via WhatsApp'
              : 'Preencha seus dados para enviar'}
          </button>
          {!formCompleto && (
            <p className="text-center text-sm text-gray-500 mt-2">
              Complete todos os campos acima para enviar sua rota
            </p>
          )}
        </>
      )}
    </div>
  )
}

export default App
