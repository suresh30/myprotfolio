import React, { Suspense, useEffect, useState } from 'react'
import { Canvas, useLoader } from '@react-three/fiber'
import { OrbitControls, Preload } from '@react-three/drei'
import CanvasLoader from '../Loader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Computers = ({ isMobile }) => {
  // console.log(isMobile)
  const computer = useLoader(GLTFLoader, './desktop_pc/ImageToStl.com_suresh.glb');
  // const computer = useLoader(GLTFLoader, './desktop_pc/scene.gltf');
  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor="black" />
      <pointLight intensity={1} />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      {/* <primitive object={computer.scene} scale={isMobile ? 0.9 : 0.95} position={isMobile ? [0, -2.25, -2.2] : [0, -3.25, -1.5]} rotation={[-0.01, -0.2, -0.1]} /> */}
      <primitive object={computer.scene} scale={isMobile ? 0.7 : 0.65} position={isMobile ? [0, -2.25, -2.2] : [0, -3.25, -1.5]} rotation={[90, 0, -0.1]} />
    </mesh>
  )
}

const ComputersCanvas = () => {
  // const [isMobile, setIsMobile] = useState(false);

  // useEffect(() => {
  //   const mediaQuery = window.matchMedia('(max-width: 500px)');
  //   setIsMobile(mediaQuery.matches);
  //   const handleMediaQueryChange = (event) => {
  //     console.log("test", event)
  //     setIsMobile(event.matches);
  //   }
  //   mediaQuery.addEventListener('change', handleMediaQueryChange);
  //   return () => {
  //     mediaQuery.removeEventListener('change', handleMediaQueryChange);
  //   }
  // }, []);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas shadows camera={{ position: [240, 220, 5], fov: 35 }} gl={{ preserveDrawingBuffer: true }}>
      {/* 20,3,5 */}
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
        <Computers isMobile={isMobile} />
      </Suspense>
      <Preload all />
    </Canvas>
  )
}

export default ComputersCanvas