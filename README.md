## 🧪 Testes e Validação

Use `test_checklist.html` para executar a bateria de testes manuais:

- Navegação e interface
- Usabilidade e fluxos (inclui retomada de progresso)
- Funcionalidades do quiz
- Responsividade
- Persistência de dados (localStorage)
- Tratamento de erros
- Acessibilidade (teclado, ARIA, skip link)
- Conectividade e rede (prefetch, throttling 3G)

Abra `index.html` localmente ou via GitHub Pages e depois `test_checklist.html` em outra aba.

## ♿ Acessibilidade

- Skip link nas páginas (`Pular para o conteúdo`)
- Roles ARIA para dialogs e grupos de alternativas (radiogroup)
- Navegação por teclado nas alternativas (setas, Enter/Espaço)
- Estados vivos nas métricas do lobby (aria-live)

## 💾 Persistência

- Estatísticas globais: `saebStats`
- Progresso Matemática: `mathQuizProgress`
- Progresso Português: `portQuizProgress`

## 🔧 Manutenção Rápida

- Questões: edite os arrays `questions` nos arquivos de quiz
- Estilos: variáveis em `:root` e componentes no `<style>`
- Desempenho: prefeteche de páginas e listeners passive já configurados

