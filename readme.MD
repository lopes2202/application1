# 📱 AnimeApp

Um aplicativo mobile de animes feito com **React Native** e **Expo**, que permite aos usuários se registrarem, fazerem login, visualizar uma lista de animes, favoritar seus preferidos e ver seu perfil. Os dados de autenticação são integrados com o **Firebase**.

---

## 🚀 Funcionalidades

- 🔐 Autenticação de usuários com Firebase (e-mail e senha)
- 🏠 Tela inicial com listagem de animes (API pública)
- ❤️ Sistema de favoritos com persistência
- 👤 Tela de perfil com dados do usuário e lista de animes favoritos
- 🌙 Suporte a tema escuro (Dark Mode)
- 📦 Armazenamento local (com possível uso de AsyncStorage)
- 🔄 Animações com Reanimated
- 📲 Navegação com React Navigation (Stack + Drawer)

---

## 🛠️ Tecnologias e bibliotecas

- **React Native** (via Expo)
- **Firebase** (Auth + Firestore)
- **React Navigation**
- **Axios** (requisições HTTP)
- **React Native Reanimated**
- **AsyncStorage**
- **Context API** (para estado global de usuário e favoritos)

---

## 📁 Estrutura de pastas

```
src/
├── components/         # Componentes reutilizáveis
├── context/            # Contextos globais (usuário, tema)
├── navigation/         # Rotas (Drawer, Stack, Auth)
├── screens/            # Telas principais (Home, Login, Register, Profile)
├── services/           # Conexões com APIs externas (Ex: API de animes)
firebaseconfig.js       # Configuração do Firebase
App.js                  # Entrada principal do app
```

---

## 🔧 Configuração do Firebase

1. Crie um projeto no [Firebase Console](https://console.firebase.google.com).
2. Ative o **Authentication (Email/Password)**.
3. Adicione seu `firebaseConfig` no arquivo `firebaseconfig.js`.

```js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
```

---

## ▶️ Como rodar

### Pré-requisitos:
- Node.js
- Expo CLI (`npm install -g expo-cli`)

### Instalação:

```bash
git clone https://github.com/lopes2202/application1.git
cd application1
npm install
```

### Execução:

```bash
npm start
```

Abra o app no seu celular com o **Expo Go**, ou rode no emulador Android/iOS.

---

## 💡 Observações

- Em caso de erro relacionado ao Firebase (`auth/react-native`), adicione o seguinte `metro.config.js`:

```js
const { getDefaultConfig } = require('expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);
defaultConfig.resolver.sourceExts.push('cjs');
defaultConfig.resolver.unstable_enablePackageExports = false;

module.exports = defaultConfig;
```

---

## 🧑‍💻 Autor

Desenvolvido por [Gabriel Lopes de Brito].

---

