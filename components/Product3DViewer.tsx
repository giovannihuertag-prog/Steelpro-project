import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stage, Float, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

// Fix for missing React Three Fiber JSX types
declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: any;
      mesh: any;
      boxGeometry: any;
      meshStandardMaterial: any;
      cylinderGeometry: any;
      color: any;
      [elemName: string]: any;
    }
  }
}

// --- GEOMETRIES ---

// A procedural industrial machine representation
const IndustrialMachine = (props: any) => {
    const group = useRef<THREE.Group>(null);
    
    // Simple rotation animation
    useFrame((state) => {
        if(group.current) {
            group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
        }
    });

    return (
        <group ref={group} {...props} dispose={null}>
            {/* Chassis */}
            <mesh position={[0, 0.5, 0]}>
                <boxGeometry args={[2, 1, 3.5]} />
                <meshStandardMaterial color="#eab308" roughness={0.3} metalness={0.1} />
            </mesh>
            
            {/* Cab */}
            <mesh position={[0, 1.5, 0.5]}>
                <boxGeometry args={[1.5, 1.2, 1.5]} />
                <meshStandardMaterial color="#1a1a1a" roughness={0.2} />
            </mesh>
             {/* Cab Glass */}
             <mesh position={[0, 1.6, 0.8]}>
                <boxGeometry args={[1.4, 0.8, 1]} />
                <meshStandardMaterial color="#88ccff" transparent opacity={0.6} roughness={0} />
            </mesh>

            {/* Wheels / Tracks */}
            <mesh position={[1.1, 0.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.6, 0.6, 0.5, 32]} />
                <meshStandardMaterial color="#111" roughness={0.9} />
            </mesh>
            <mesh position={[-1.1, 0.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.6, 0.6, 0.5, 32]} />
                <meshStandardMaterial color="#111" roughness={0.9} />
            </mesh>
             <mesh position={[1.1, 0.5, 1.5]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.6, 0.6, 0.5, 32]} />
                <meshStandardMaterial color="#111" roughness={0.9} />
            </mesh>
            <mesh position={[-1.1, 0.5, 1.5]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.6, 0.6, 0.5, 32]} />
                <meshStandardMaterial color="#111" roughness={0.9} />
            </mesh>
             <mesh position={[1.1, 0.5, -1.5]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.6, 0.6, 0.5, 32]} />
                <meshStandardMaterial color="#111" roughness={0.9} />
            </mesh>
             <mesh position={[-1.1, 0.5, -1.5]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.6, 0.6, 0.5, 32]} />
                <meshStandardMaterial color="#111" roughness={0.9} />
            </mesh>

            {/* Boom/Arm placeholder */}
            <mesh position={[0, 1, -1.8]} rotation={[Math.PI / 4, 0, 0]}>
                 <boxGeometry args={[0.8, 0.4, 3]} />
                 <meshStandardMaterial color="#eab308" roughness={0.3} metalness={0.1} />
            </mesh>
        </group>
    );
};

// A procedural metal beam representation (I-Beam)
const IndustrialMetal = (props: any) => {
    const group = useRef<THREE.Group>(null);

    return (
        <group ref={group} {...props} dispose={null}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                {/* I-Beam */}
                <group rotation={[Math.PI / 4, Math.PI / 4, 0]}>
                     {/* Web */}
                    <mesh>
                        <boxGeometry args={[0.15, 1.5, 4.5]} />
                        <meshStandardMaterial color="#b0b0b0" roughness={0.4} metalness={0.9} />
                    </mesh>
                    {/* Top Flange */}
                    <mesh position={[0, 0.75, 0]}>
                        <boxGeometry args={[1, 0.15, 4.5]} />
                        <meshStandardMaterial color="#b0b0b0" roughness={0.4} metalness={0.9} />
                    </mesh>
                    {/* Bottom Flange */}
                    <mesh position={[0, -0.75, 0]}>
                        <boxGeometry args={[1, 0.15, 4.5]} />
                        <meshStandardMaterial color="#b0b0b0" roughness={0.4} metalness={0.9} />
                    </mesh>
                </group>
                
                {/* Hollow Tube / Pipe Element */}
                <mesh position={[1.5, 0, 0.5]} rotation={[0.2, 0, 0.2]}>
                    <cylinderGeometry args={[0.4, 0.4, 3.5, 32, 1, true]} />
                    <meshStandardMaterial color="#a0a0a0" roughness={0.3} metalness={1} side={THREE.DoubleSide} />
                </mesh>
            </Float>
        </group>
    );
};

interface Product3DViewerProps {
    category: 'construction' | 'engineering' | 'steel';
    className?: string;
}

const Product3DViewer: React.FC<Product3DViewerProps> = ({ category, className }) => {
    return (
        <div className={`w-full h-full ${className}`}>
            <Canvas shadows camera={{ position: [4, 4, 6], fov: 45 }}>
                <color attach="background" args={['#09090b']} />
                
                <Stage environment="city" intensity={0.6} adjustCamera={false}>
                    {category === 'steel' ? (
                        <IndustrialMetal />
                    ) : (
                        <IndustrialMachine />
                    )}
                </Stage>

                <ContactShadows opacity={0.4} scale={10} blur={2} far={4.5} />
                <OrbitControls 
                    enablePan={false} 
                    minPolarAngle={0} 
                    maxPolarAngle={Math.PI / 2} 
                    autoRotate 
                    autoRotateSpeed={0.5}
                />
            </Canvas>
        </div>
    );
};

export default Product3DViewer;