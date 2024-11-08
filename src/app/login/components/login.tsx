'use client';

import React, { useState } from 'react';
import styles from './login.module.css';
import Link from 'next/link';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        senha: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <img 
                    src="/img/celular.svg" 
                    alt="Illustration" 
                    className={styles.image} 
                />
            </div>
            <div className={styles.right}>
                <h2>Faça login em nosso aplicativo</h2>
                <p>Digite o nome de usuário e a senha</p>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="E-mail" 
                        required 
                        className={styles.input}
                    />
                    <input 
                        type="password" 
                        name="senha"
                        value={formData.senha}
                        onChange={handleInputChange}
                        placeholder="Senha" 
                        required 
                        className={styles.input}
                    />
                    <button type="submit" className={`${styles.button} ${styles.input}`}>
                        Entrar
                    </button>
                </form>
                <p className={styles.registerLink}>
                    Não tem uma conta? <Link href="/register">Inscreva-se aqui</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
