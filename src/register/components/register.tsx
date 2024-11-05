'use client';

import React, { useState } from 'react';
import styles from './register.module.css';

export default function Register() {
  const [formData, setFormData] = useState({
    tipoUsuario: 'usuario',
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica de envio do formulário
    console.log(formData);
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
          <div className={styles.radioGroup}>
            <label>
              <input
                type="radio"
                name="tipoUsuario"
                value="usuario"
                checked={formData.tipoUsuario === 'usuario'}
                onChange={handleInputChange}
                className={styles.input}
              />
              Usuário
            </label>
            <label>
              <input
                type="radio"
                name="tipoUsuario"
                value="proprietario"
                checked={formData.tipoUsuario === 'proprietario'}
                onChange={handleInputChange}
                className={styles.input}
              />
              Proprietário
            </label>
          </div>
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
          ou <a href="/login">Faça login aqui</a>
        </p>
      </div>
    </div>
  );
}
