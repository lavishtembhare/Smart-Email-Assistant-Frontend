import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function HeroScene({ mode = 'dark' }) {
  const mountRef = useRef(null)

  useEffect(() => {
    const currentMount = mountRef.current
    if (!currentMount) return

    // Scene Setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      55,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000
    )
    camera.position.z = 18

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    currentMount.appendChild(renderer.domElement)

    // Palette per mode
    const isDark = mode === 'dark'
    const coreColor = isDark ? 0x6366f1 : 0x4f46e5
    const wireColor = isDark ? 0x38bdf8 : 0x6366f1
    const particleColor = isDark ? 0xa855f7 : 0x0284c7

    // Central Floating 3D Geometric AI Core
    const group = new THREE.Group()
    scene.add(group)

    const icosaGeometry = new THREE.IcosahedronGeometry(4.5, 1)
    const wireframeMaterial = new THREE.MeshStandardMaterial({
      color: wireColor,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.35 : 0.45,
      roughness: 0.2,
      metalness: 0.8,
    })
    const icosaMesh = new THREE.Mesh(icosaGeometry, wireframeMaterial)
    group.add(icosaMesh)

    // Inner Solid Facet Core
    const innerGeometry = new THREE.IcosahedronGeometry(2.4, 0)
    const innerMaterial = new THREE.MeshStandardMaterial({
      color: coreColor,
      roughness: 0.1,
      metalness: 0.9,
      emissive: coreColor,
      emissiveIntensity: isDark ? 0.4 : 0.2,
    })
    const innerMesh = new THREE.Mesh(innerGeometry, innerMaterial)
    group.add(innerMesh)

    // Floating Orbiting Particles (Neural Nodes)
    const particleCount = 200
    const particleGeo = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 7 + Math.random() * 8
      const theta = THREE.MathUtils.randFloatSpread(360)
      const phi = THREE.MathUtils.randFloatSpread(360)

      positions[i] = radius * Math.sin(theta) * Math.cos(phi)
      positions[i + 1] = radius * Math.sin(theta) * Math.sin(phi)
      positions[i + 2] = radius * Math.cos(theta)
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const particleMat = new THREE.PointsMaterial({
      size: 0.14,
      color: particleColor,
      transparent: true,
      opacity: isDark ? 0.8 : 0.6,
      blending: THREE.AdditiveBlending,
    })
    const particles = new THREE.Points(particleGeo, particleMat)
    group.add(particles)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, isDark ? 0.8 : 1.2)
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0x00ffff, 2.5, 40)
    pointLight.position.set(10, 12, 10)
    scene.add(pointLight)

    const secondaryLight = new THREE.PointLight(0xec4899, 2, 40)
    secondaryLight.position.set(-10, -10, -5)
    scene.add(secondaryLight)

    // Interactive Mouse Tracking with smooth lerp
    let targetX = 0
    let targetY = 0
    let mouseX = 0
    let mouseY = 0

    const handleMouseMove = (event) => {
      const rect = currentMount.getBoundingClientRect()
      mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1
      mouseY = -(((event.clientY - rect.top) / rect.height) * 2 - 1)
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Resize Handler
    const handleResize = () => {
      if (!currentMount) return
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight)
    }
    window.addEventListener('resize', handleResize)

    // Animation Loop
    let animationFrameId
    let clock = new THREE.Clock()

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      const elapsedTime = clock.getElapsedTime()

      targetX += (mouseX - targetX) * 0.05
      targetY += (mouseY - targetY) * 0.05

      // Continuous rotation + mouse parallax
      group.rotation.y = elapsedTime * 0.25 + targetX * 0.6
      group.rotation.x = Math.sin(elapsedTime * 0.2) * 0.15 + targetY * 0.4

      // Gentle pulsating effect
      const scale = 1 + Math.sin(elapsedTime * 1.5) * 0.03
      innerMesh.scale.set(scale, scale, scale)

      renderer.render(scene, camera)
    }
    animate()

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      if (currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement)
      }
      renderer.dispose()
      icosaGeometry.dispose()
      wireframeMaterial.dispose()
      innerGeometry.dispose()
      innerMaterial.dispose()
      particleGeo.dispose()
      particleMat.dispose()
    }
  }, [mode])

  return (
    <div
      ref={mountRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}