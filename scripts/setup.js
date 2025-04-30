const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

// Função para rodar comandos no shell sem exibir as saídas
function runCommand(command) {
  try {
    execSync(command, { stdio: 'ignore', shell: true });
  } catch (error) {
    console.error(`❌ Erro ao executar o comando: ${command}`);
    process.exit(1);
  }
}

// Função para verificar e instalar dependências (Node.js e pnpm)
function checkDependencies() {
  try {
    execSync('node --version', { stdio: 'ignore' });
  } catch {
    console.error('❌ Node.js não está instalado.');
    process.exit(1);
  }

  try {
    execSync('pnpm --version', { stdio: 'ignore' });
  } catch {
    console.log('⚠️ pnpm não encontrado. Tentando habilitar com Corepack...');
    try {
      execSync('corepack enable pnpm', { stdio: 'ignore' });
      console.log('✅ pnpm habilitado com Corepack!');
    } catch {
      console.log('⚠️ Falha ao usar Corepack. Instalando pnpm globalmente com npm...');
      try {
        execSync('npm install -g pnpm', { stdio: 'ignore' });
        console.log('✅ pnpm instalado globalmente!');
      } catch {
        console.error('❌ Falha ao instalar o pnpm. Instale manualmente e tente novamente.');
        process.exit(1);
      }
    }
  }

  console.log('✅ Node.js e pnpm estão prontos!');
}


function updateHostsFile() {
  const hostname = 'local.homologacao.regulav2.lais.ufrn.br';
  const hostsPath =
    os.platform() === 'win32'
      ? 'C:\\Windows\\System32\\drivers\\etc\\hosts'
      : '/etc/hosts';

  try {
    const content = fs.readFileSync(hostsPath, 'utf8');

    if (!content.includes(hostname)) {
      const newEntry = `127.0.0.1 ${hostname}\n`;
      const updatedContent = content + '\n' + newEntry;

      fs.writeFileSync(hostsPath, updatedContent, { flag: 'a' }); // 'a' append
      console.log(`✅ Entrada adicionada ao arquivo hosts para ${hostname}`);
    } else {
      console.log(`ℹ️  Entrada para ${hostname} já existe no arquivo hosts.`);
    }
  } catch (error) {
    console.error('❌ Erro ao modificar o arquivo hosts. Tente rodar como administrador.');
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
  console.log('🚀 Iniciando o setup do projeto...\n');

  checkDependencies();

  createEnvFile();

  console.log('📦 Instalando as dependências do projeto usando pnpm...');
  runCommand('pnpm install');


  console.log('📦 Verificando o arquivo de hosts do sistema...');
  updateHostsFile()

  console.log('\n🎉 Setup completo!');

  console.log(`
🔧 Próximos passos:

👉 Para rodar em modo de desenvolvimento:
   pnpm dev

🚀 Para rodar em modo de produção:
   pnpm prod
`);
}

// Executar o setup
setup();
