const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Função para rodar comandos no shell sem exibir as saídas
function runCommand(command) {
  try {
    execSync(command, { stdio: 'ignore', shell: true }); // Suprime a saída
  } catch (error) {
    console.error(`❌ Erro ao executar o comando: ${command}`);
    process.exit(1);
  }
}

// Função para verificar a presença do Docker, Node.js e habilitar o pnpm
function checkDependencies() {
  try {
    execSync('node --version', { stdio: 'ignore' });
    execSync('npm install -g pnpm', { stdio: 'ignore' }); // Habilitar o pnpm
    console.log('✅ Node.js e pnpm configurados!');
  } catch (error) {
    console.error(
      '❌ Certifique-se de que o pnpm e o Node.js estão instalados corretamente.',
    );
    process.exit(1);
  }
}

// Função para criar o arquivo .env
function createEnvFile() {
  const envFile = path.resolve(__dirname, "..", "apps", "web", '.env');
  if (!fs.existsSync(envFile)) {
    console.log('🌱 Configurando as variáveis de ambiente...');
    fs.copyFileSync(path.resolve(__dirname, "..", "apps", "web", '.env.example'), envFile);
  } else {
    console.log('⚠️ .env já existe. Pulando criação do arquivo.');
  }
}

// Função principal que executa o setup
function setup() {
  console.log('🚀 Iniciando o setup do projeto Inova Regulação API...\n');

  // checkDependencies();

  // Passo 1: Configurando variáveis de ambiente
  createEnvFile();

  // Passo 2: Instalando as dependências
  console.log('📦 Instalando as dependências do projeto usando pnpm...');
  runCommand('pnpm install');

  console.log(
    '\n🎉 Setup completo! Agora você pode rodar a API com "pnpm dev".',
  );
}

// Executar o setup
setup();
