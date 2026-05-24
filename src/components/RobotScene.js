'use client';
import { useEffect, useRef } from 'react';

/* ══════════════════════════════════════════════
   RobotScene — Clean 3D robot that:
   • Always hovers (floats up & down)
   • Tracks & follows the mouse cursor
   • Simple aesthetic, no glaze/glass
══════════════════════════════════════════════ */
export default function RobotScene() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let animId;
    // Mouse tracking
    const mouse = { x: 0, y: 0, nx: 0, ny: 0 };

    function onMouseMove(e) {
      mouse.nx = (e.clientX / window.innerWidth)  * 2 - 1;
      mouse.ny = (e.clientY / window.innerHeight) * 2 - 1;
    }
    window.addEventListener('mousemove', onMouseMove);

    async function init() {
      const THREE = (await import('three')).default || await import('three');
      const canvas = canvasRef.current;
      if (!canvas) return;

      // ── RENDERER ──────────────────────────────
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;

      // ── SCENE ─────────────────────────────────
      const scene = new THREE.Scene();

      // ── CAMERA ────────────────────────────────
      const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100);
      camera.position.set(0, 1.2, 9);
      camera.lookAt(0, 1, 0);

      // ── LIGHTS ────────────────────────────────
      scene.add(new THREE.AmbientLight(0x112244, 5));

      const keyLight = new THREE.DirectionalLight(0x00d4ff, 4);
      keyLight.position.set(4, 8, 5);
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      scene.add(keyLight);

      const rimLight = new THREE.DirectionalLight(0xff2266, 2);
      rimLight.position.set(-5, 3, -3);
      scene.add(rimLight);

      const fillLight = new THREE.DirectionalLight(0x4444ff, 1.5);
      fillLight.position.set(0, -3, 5);
      scene.add(fillLight);

      // Floating accent lights that move with animation
      const orbA = new THREE.PointLight(0x00d4ff, 12, 14);
      const orbB = new THREE.PointLight(0xff2266, 8, 10);
      scene.add(orbA, orbB);

      // ── MATERIALS ─────────────────────────────
      const matBody   = new THREE.MeshStandardMaterial({ color: 0x0d1a2e, metalness: 0.9, roughness: 0.15 });
      const matDark   = new THREE.MeshStandardMaterial({ color: 0x060e1c, metalness: 0.95, roughness: 0.1 });
      const matAccent = new THREE.MeshStandardMaterial({ color: 0x00d4ff, metalness: 0.4, roughness: 0.05, emissive: 0x00d4ff, emissiveIntensity: 0.8 });
      const matPink   = new THREE.MeshStandardMaterial({ color: 0xff2266, metalness: 0.4, roughness: 0.05, emissive: 0xff2266, emissiveIntensity: 0.7 });
      const matEye    = new THREE.MeshStandardMaterial({ color: 0x00d4ff, metalness: 0.1, roughness: 0.0, emissive: 0x00d4ff, emissiveIntensity: 2.0 });
      const matJoint  = new THREE.MeshStandardMaterial({ color: 0x0a1628, metalness: 0.95, roughness: 0.05 });
      const matChest  = new THREE.MeshStandardMaterial({ color: 0x00d4ff, metalness: 0.2, roughness: 0.0, emissive: 0x00d4ff, emissiveIntensity: 0.5, transparent: true, opacity: 0.85 });

      // ── HELPERS ───────────────────────────────
      const robotGroup = new THREE.Group();
      scene.add(robotGroup);

      function box(w, h, d, mat, x, y, z, parent) {
        const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d, 1, 1, 1), mat);
        m.position.set(x, y, z);
        m.castShadow = true; m.receiveShadow = true;
        (parent || robotGroup).add(m);
        return m;
      }
      function cyl(rt, rb, h, seg, mat, x, y, z, parent) {
        const m = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), mat);
        m.position.set(x, y, z);
        m.castShadow = true;
        (parent || robotGroup).add(m);
        return m;
      }
      function sph(r, mat, x, y, z, parent) {
        const m = new THREE.Mesh(new THREE.SphereGeometry(r, 16, 12), mat);
        m.position.set(x, y, z);
        m.castShadow = true;
        (parent || robotGroup).add(m);
        return m;
      }

      // ── HEAD GROUP ────────────────────────────
      const headGroup = new THREE.Group();
      robotGroup.add(headGroup);
      headGroup.position.set(0, 3.5, 0);

      // Skull (rounded box look)
      box(1.3, 1.15, 1.05, matBody, 0, 0, 0, headGroup);
      // Forehead ridge
      box(1.32, 0.1, 0.2, matDark, 0, 0.5, 0.45, headGroup);
      // Eye visor slit (glowing strip)
      box(0.85, 0.22, 0.12, matChest, 0, 0.1, 0.55, headGroup);
      // Eyes
      sph(0.09, matEye, -0.22, 0.1, 0.6, headGroup);
      sph(0.09, matEye,  0.22, 0.1, 0.6, headGroup);
      // Mouth LED strip
      box(0.55, 0.06, 0.08, matAccent, 0, -0.22, 0.55, headGroup);
      // Ear panels
      box(0.12, 0.65, 0.8, matDark, -0.73, 0, 0, headGroup);
      box(0.12, 0.65, 0.8, matDark,  0.73, 0, 0, headGroup);
      // Ear accent dots
      sph(0.06, matPink, -0.82, 0.15, 0.15, headGroup);
      sph(0.06, matPink,  0.82, 0.15, 0.15, headGroup);
      // Antenna
      cyl(0.03, 0.03, 0.6, 8, matAccent, 0, 0.88, 0, headGroup);
      sph(0.09, matPink, 0, 1.2, 0, headGroup);

      // ── NECK ──────────────────────────────────
      cyl(0.2, 0.25, 0.28, 10, matJoint, 0, 2.95, 0);

      // ── TORSO ─────────────────────────────────
      const torsoGroup = new THREE.Group();
      robotGroup.add(torsoGroup);

      box(2.1, 1.65, 0.95, matBody, 0, 2.15, 0, torsoGroup);
      // Chest core orb
      sph(0.22, matChest, 0, 2.45, 0.5, torsoGroup);
      cyl(0.28, 0.28, 0.04, 24, matAccent, 0, 2.45, 0.5, torsoGroup);
      // Chest plate
      box(1.35, 0.95, 0.1, matDark, 0, 2.25, 0.5, torsoGroup);
      // Horizontal vents
      for (let y of [2.05, 2.2, 2.35]) {
        box(0.85, 0.045, 0.05, matAccent, 0, y, 0.56, torsoGroup);
      }
      // Side panels
      box(0.25, 1.1, 0.7, matDark, -1.15, 2.15, 0, torsoGroup);
      box(0.25, 1.1, 0.7, matDark,  1.15, 2.15, 0, torsoGroup);
      // Pink side stripes
      box(0.04, 0.35, 0.06, matPink, -1.28, 2.4, 0.2, torsoGroup);
      box(0.04, 0.35, 0.06, matPink,  1.28, 2.4, 0.2, torsoGroup);
      // Shoulder pads
      box(0.6, 0.38, 0.8, matBody, -1.4, 2.85, 0, torsoGroup);
      box(0.6, 0.38, 0.8, matBody,  1.4, 2.85, 0, torsoGroup);
      box(0.62, 0.1, 0.82, matAccent, -1.4, 3.04, 0, torsoGroup);
      box(0.62, 0.1, 0.82, matAccent,  1.4, 3.04, 0, torsoGroup);

      // ── ARMS ──────────────────────────────────
      const lArm = new THREE.Group(); robotGroup.add(lArm);
      const rArm = new THREE.Group(); robotGroup.add(rArm);

      function buildArm(g, s) {
        box(0.42, 1.0, 0.42, matBody,  s*1.85, 2.2,  0, g);
        cyl(0.22, 0.22, 0.2, 12, matJoint, s*1.85, 1.65, 0, g);
        box(0.36, 0.9,  0.36, matDark, s*1.85, 1.12, 0, g);
        box(0.38, 0.12, 0.07, matAccent, s*1.85, 1.3, 0.2, g);
        box(0.46, 0.4,  0.32, matBody, s*1.85, 0.62, 0, g);
        // Fingers
        for (let f = 0; f < 4; f++) {
          box(0.07, 0.25, 0.07, matDark, s*(1.73+f*0.08), 0.42, 0.1, g);
        }
      }
      buildArm(lArm, -1);
      buildArm(rArm,  1);

      // ── WAIST ─────────────────────────────────
      cyl(0.6, 0.7, 0.3, 16, matJoint, 0, 1.32, 0);
      box(1.7, 0.28, 0.78, matBody, 0, 1.32, 0);

      // ── HIPS ──────────────────────────────────
      box(1.85, 0.38, 0.82, matDark, 0, 1.08, 0);

      // ── LEGS ──────────────────────────────────
      for (let s of [-1, 1]) {
        box(0.55, 0.95, 0.55, matBody,  s*0.65, 0.62, 0);
        cyl(0.28, 0.28, 0.2, 12, matJoint, s*0.65, 0.12, 0);
        box(0.48, 0.9,  0.5,  matDark, s*0.65, -0.35, 0);
        // Shin stripe
        box(0.5, 0.1, 0.07, matPink, s*0.65, -0.1, 0.28);
        // Foot
        box(0.56, 0.24, 0.8,  matBody, s*0.65, -0.84, 0.08);
        box(0.58, 0.06, 0.82, matAccent, s*0.65, -0.72, 0.08);
      }

      // ── GROUND GRID ───────────────────────────
      const gridHelper = new THREE.GridHelper(30, 30, 0x00d4ff, 0x001a33);
      gridHelper.position.y = -1.05;
      gridHelper.material.opacity = 0.18;
      gridHelper.material.transparent = true;
      scene.add(gridHelper);

      // ── FLOATING PARTICLES ────────────────────
      const PCOUNT = 400;
      const pPositions = new Float32Array(PCOUNT * 3);
      const pColors    = new Float32Array(PCOUNT * 3);
      const pVelocities = [];
      for (let i = 0; i < PCOUNT; i++) {
        pPositions[i*3]   = (Math.random() - 0.5) * 20;
        pPositions[i*3+1] = (Math.random() - 0.5) * 14;
        pPositions[i*3+2] = (Math.random() - 0.5) * 12;
        const cyan = Math.random() > 0.4;
        pColors[i*3]   = cyan ? 0   : 1;
        pColors[i*3+1] = cyan ? 0.83: 0.13;
        pColors[i*3+2] = cyan ? 1   : 0.4;
        pVelocities.push({
          vy: (Math.random() - 0.35) * 0.35,
          vx: (Math.random() - 0.5) * 0.08,
        });
      }
      const pGeo = new THREE.BufferGeometry();
      const posAttr = new THREE.BufferAttribute(pPositions, 3);
      posAttr.setUsage(THREE.DynamicDrawUsage);
      pGeo.setAttribute('position', posAttr);
      pGeo.setAttribute('color', new THREE.BufferAttribute(pColors, 3));
      const pMat = new THREE.PointsMaterial({ size: 0.07, vertexColors: true, transparent: true, opacity: 0.65, sizeAttenuation: true });
      scene.add(new THREE.Points(pGeo, pMat));

      // ── CLOCK & LOOP ──────────────────────────
      const clock = new THREE.Clock();

      function animate() {
        animId = requestAnimationFrame(animate);
        const dt = Math.min(clock.getDelta(), 0.05);
        const t  = clock.getElapsedTime();

        // Smooth mouse interpolation
        mouse.x += (mouse.nx - mouse.x) * 0.06;
        mouse.y += (mouse.ny - mouse.y) * 0.06;

        // Hovering — robot floats up and down
        robotGroup.position.y = Math.sin(t * 0.7) * 0.18;

        // Robot body gently sways, but mostly follows mouse
        robotGroup.rotation.y = mouse.x * 0.35 + Math.sin(t * 0.2) * 0.06;

        // Head follows mouse more aggressively
        headGroup.rotation.y = mouse.x * 0.55;
        headGroup.rotation.x = -mouse.y * 0.3 + Math.sin(t * 0.4) * 0.04;

        // Arms swing subtly
        lArm.rotation.z =  Math.sin(t * 0.5) * 0.1 + 0.05 + mouse.y * 0.08;
        rArm.rotation.z = -Math.sin(t * 0.5) * 0.1 - 0.05 - mouse.y * 0.08;

        // Eye & chest glow pulse
        matEye.emissiveIntensity   = 1.8 + Math.sin(t * 2.5) * 0.5;
        matChest.emissiveIntensity = 0.4 + Math.sin(t * 1.8) * 0.2;
        matAccent.emissiveIntensity= 0.7 + Math.sin(t * 3.0) * 0.2;

        // Orbiting lights
        orbA.position.set(Math.sin(t * 0.5) * 5, 2 + Math.sin(t * 0.4) * 2, Math.cos(t * 0.45) * 4);
        orbB.position.set(Math.cos(t * 0.45) * 4, 1.5 + Math.cos(t * 0.3) * 1.5, Math.sin(t * 0.55) * 3);

        // Particles drift
        for (let i = 0; i < PCOUNT; i++) {
          pPositions[i*3+1] += pVelocities[i].vy * dt;
          pPositions[i*3]   += pVelocities[i].vx * dt;
          if (pPositions[i*3+1] > 8)  { pPositions[i*3+1] = -7; pPositions[i*3] = (Math.random()-0.5)*20; }
          if (pPositions[i*3+1] < -8) {  pPositions[i*3+1] =  7; }
        }
        posAttr.needsUpdate = true;

        // Camera subtle parallax with scroll
        const sf = window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight);
        camera.position.z = 9 - sf * 3.5;
        camera.position.y = 1.2 - sf * 0.8;
        camera.lookAt(0, 1 - sf * 0.4, 0);

        renderer.render(scene, camera);
      }
      animate();

      window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });
    }

    init();
    return () => {
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100%', height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
