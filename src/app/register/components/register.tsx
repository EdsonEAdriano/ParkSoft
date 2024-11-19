"use client";

import React, { useState } from "react";
import styles from "./register.module.css";
import Link from "next/link";
import PasswordValidator from "password-validator";
import axios from "axios";

export default function Register() {

  const [listPasswordValidator, setlistPasswordValidator] = useState([]);

  const schema = new PasswordValidator();
  
  schema
    .is().min(8)
    .has().uppercase()
    .has().lowercase()
    .has().digits()
    .has().symbols()
    .has().not().spaces();

  const [formData, setFormData] = useState({
    nomeCompleto: "",
    email: "",
    senha: "",
    confirmaSenha: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.senha !== formData.confirmaSenha) {
      console.error("As senhas não coincidem");
      return;
    }

    const validationResults = schema.validate(formData.senha, { list: true });
    if (validationResults.length > 0) {
      setlistPasswordValidator(validationResults);
      return;
    }

    console.log("Dados a serem enviados:", {
      email: formData.email,
      password: formData.senha,
      name: formData.nomeCompleto,
    });

    try {
      await axios.post("/api/register", { 
            email: formData.email, 
            password: formData.senha, 
            name: formData.nomeCompleto 
          });

      window.location.href = '/login';
    } catch (error) {
      console.error("Erro ao realizar cadastro. ", error);
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
          {listPasswordValidator.length > 0 ? (
            <div className={styles.validationList}>
              <p>Requisitos de senha:</p>
              <ul>
                {listPasswordValidator.map((row, index) => (
                  <li key={index}>
                    {row === "min"
                      ? "A senha deve ter um comprimento mínimo de 8 caracteres"
                      : row === "uppercase"
                        ? "A senha deve ter, no mínimo, uma letra maiúscula"
                        : row === "lowercase"
                          ? "A senha deve ter, no mínimo, uma letra minúscula"
                          : row === "symbols"
                            ? "A senha deve ter um mínimo de 1 símbolo"
                            : row === "digits"
                              ? "A senha deve ter um mínimo de 1 número"
                              : ""}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <></>
          )}

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
          <button type="submit" className={`${styles.button} ${styles.input}`}>
            Cadastrar
          </button>
        </form>
        <p className={styles.loginLink}>
          ou <Link href="/login">Faça login aqui</Link>
        </p>
      </div>
    </div>
  );
}
