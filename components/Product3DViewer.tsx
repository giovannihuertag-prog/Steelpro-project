import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stage, Float, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

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

// A procedural metal bar/tube representation
const IndustrialMetal = (props: any) => {
    const group = useRef<THREE.Group>(null);

    return (
        <group ref={group} {...props} dispose={null}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                {/* Main Bar */}
                <mesh rotation={[0, 0, Math.PI / 4]}>
                    <cylinderGeometry args={[0.4, 0.4, 4, 64]} />
                    <meshStandardMaterial 
                        color="#aaa" 
                        roughness={0.2} 
                        metalness={1} 
                        envMapIntensity={1}
                    />
                </mesh>
                
                {/* Secondary Bar for visual interest */}
                <mesh position={[0.8, 0.5, 0.5]} rotation={[0, 0, Math.PI / 4]}>
                    <cylinderGeometry args={[0.3, 0.3, 3.5, 64]} />
                    <meshStandardMaterial 
                        color="#888" 
                        roughness={0.2} 
                        metalness={1} 
                        envMapIntensity={1}
                    />
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
