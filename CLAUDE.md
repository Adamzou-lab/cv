# Instructions — hub (adamzou.fr)

## Déploiement SSH

```
sshpass -p 'M6HiIfM3TiKUJOzv' scp -o StrictHostKeyChecking=no -P 2008 \
  <fichier(s)> \
  root@dns.safa.hugochilemme.com:/var/www/hub/
```

Toujours commit + push git après chaque déploiement.

---

## Structure du projet

| Fichier        | Rôle                                      |
|----------------|-------------------------------------------|
| `index.html`   | Page principale (production)              |
| `index-dev.html` | Page de test (ignorée par git)          |
| `style.css`    | Styles globaux du site                    |
| `bento.css`    | Layout bento grid de la section Projets   |
| `script.js`    | Nav hamburger, scroll animations, skills tabs, parallax blobs |
| `cv.html`      | CV en ligne                               |

---

## Section Projets — Bento Grid

La section projets utilise un **bento grid 3 colonnes** défini dans `bento.css`.

**Layout actuel :**
```
[ CIPHER (featured, span 2 cols) ] [ Holberton Cheatsheets ]
[ MyCal ]  [ AZ·QCM ]  [ nowindcity ]
```

### Ajouter un projet

1. Ajouter un `<article class="glass-card project-card reveal">` dans `<div class="bento-grid">`
2. Si le projet doit être **featured** (grande carte), ajouter la classe `bento-featured` — il prendra 2 colonnes automatiquement
3. Structure d'une carte :
```html
<article class="glass-card project-card reveal">
  <div class="project-header">
    <div class="project-icon">🔐</div>
    <!-- optionnel : <span class="badge-soon">En cours</span> -->
  </div>
  <h3 class="project-name">Nom du projet</h3>
  <p class="project-desc">Description courte.</p>
  <div class="project-tags">
    <span class="tag">Tech</span>
  </div>
  <div class="project-links">
    <a href="..." class="project-link">domaine.fr</a>
    <a href="https://github.com/Adamzou-lab/..." class="project-link">Voir le code</a>
  </div>
</article>
```
4. Lien désactivé (domaine pas encore acheté / projet WIP) :
```html
<a class="project-link disabled" aria-disabled="true" tabindex="-1">domaine.fr</a>
```

---

## Points d'attention

- Le CSP dans `index.html` interdit les styles inline (`<style>` et `style=""`). Tout CSS doit être dans un fichier `.css` externe lié via `<link rel="stylesheet">`.
- `index-dev.html` est dans `.gitignore` — sert à tester avant de passer en prod.
- `bento.css` est chargé après `style.css` dans le `<head>`.

---

## Infos serveur

- **SSH** : `ssh root@dns.safa.hugochilemme.com -p 2008`
- **Webroot** : `/var/www/hub/`
- **Domaine** : `adamzou.fr` (via Cloudflare)
