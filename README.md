# consultoria

Página de consultoria em provas de conceito e protótipos, em português e inglês. HTML estático, sem build.

| Arquivo | O quê |
|---|---|
| `index.html` | Página em português |
| `en/index.html` | Página em inglês (mesma estrutura) |
| `style.css` | Visual compartilhado |
| `site.js` | Contatos e links do WhatsApp (vale para as duas) |

Ao mudar um texto, lembre de mudar nas duas páginas.

## Editar contatos

No início de `site.js`, bloco `CONTATO`: número do WhatsApp (só dígitos, com 55 + DDD), e-mail, LinkedIn e a mensagem padrão em cada língua.
Enquanto o número tiver `X`, os botões de WhatsApp apenas rolam até a seção de contato.

## Ver localmente

```bash
python3 -m http.server 8000
```

Abrir http://localhost:8000

## Publicar no GitHub Pages

1. Repositório público `raphaelwb/consultoria` (já criado).
2. `git add . && git commit -m "..." && git push`
3. Em *Settings → Pages*: Source = *Deploy from a branch*, branch `main`, pasta `/ (root)`.
4. Em 1–2 minutos a página fica em https://raphaelwb.github.io/consultoria/ (inglês em https://raphaelwb.github.io/consultoria/en/)

## Casos

Há uma seção `#casos` comentada no HTML, pronta para receber os primeiros casos.
