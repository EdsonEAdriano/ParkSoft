'use client';

import React, { useState } from 'react';
import styles from './register.module.css';
import Link from 'next/link';
import axios from 'axios';

export default function Register() {
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    email: '',
    senha: '',
    confirmaSenha: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.senha !== formData.confirmaSenha) {
      alert("As senhas não coincidem");
      return;
    }

    try {
      const response = await axios.post('/api/register', {
        nomeCompleto: formData.nomeCompleto,
        email: formData.email,
        senha: formData.senha
      });

      if (response.status === 200) {
        alert("Cadastro realizado com sucesso!");
        // Redirecionar para login ou outra página
      } else {
        alert(response.data.error || "Erro ao realizar cadastro");
      }
    } catch (error) {
      alert("Erro ao realizar cadastro");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <img 
          src="/img/viagem.svg" 
          alt="Ilustração de Viagem" 
          className={styles.image} 
        />
      </div>
      <div className={styles.right}>
        <h2>Inscreva-se agora</h2>
        <p>Preencha o formulário abaixo para obter acesso instantâneo</p>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="nomeCompleto"
            value={formData.nomeCompleto}
            onChange={handleInputChange}
            placeholder="Nome Completo" 
            required 
            className={styles.input}
          />
          <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email" 
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
          <input 
            type="password" 
            name="confirmaSenha"
            value={formData.confirmaSenha}
            onChange={handleInputChange}
            placeholder="Confirme a senha" 
            required 
            className={styles.input}
          />
          <button type="submit" className={`${styles.button} ${styles.input}`}>Cadastrar</button>
        </form>
        <p className={styles.loginLink}>
          ou <Link href="/login">Faça login aqui</Link>
        </p>
      </div>
    </div>
  );
}
