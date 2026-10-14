# Zegar kroków (dance-metronom)

Rytm kroków tańca na tarczy i pasku czasu, z dźwiękiem: slow-quick-quick, tum-tchi-tchi i inne wzory.
Metronom, odliczanie „5, 6, 7, 8”, tryb ciszy co drugi cykl, stukanie z pomiarem odchyłki w ms.
Działa bez internetu.

## Instalacja na Androidzie (APK)

1. Każdy push na `main` buduje APK w GitHub Actions (zakładka **Actions → Build APK**).
2. Gotowy plik leży w wydaniu **latest**:
   `https://github.com/p-bartosz/dance-metronom/releases/latest/download/dance-metronom.apk`
   Jeśli repo jest prywatne, otwórz ten link na telefonie, będąc zalogowanym w GitHubie.
3. Otwórz pobrany plik. Za pierwszym razem Android zapyta o zgodę na instalację z tego źródła (przeglądarka lub Pliki).
4. Kolejne wersje instalują się na starej. Ustawienia zostają.

Aplikacja nie wymaga żadnych uprawnień. Ekran nie gaśnie, gdy jest otwarta. Przyciski głośności sterują dźwiękiem multimediów.

## Wersja PWA (opcjonalnie)

1. Settings → Pages → Source: **GitHub Actions**. Darmowe GitHub Pages działają tylko dla repo publicznego.
2. Actions → **Pages (PWA)** → Run workflow.
3. Otwórz adres strony w Chrome na telefonie → menu → **Zainstaluj aplikację**.

## Struktura

| Ścieżka | Co to jest |
|---|---|
| `web/index.html` | Cała aplikacja: HTML, CSS, JS w jednym pliku |
| `web/fonts/` | Archivo, Figtree, IBM Plex Mono (fontsource, licencja SIL OFL) |
| `web/manifest.webmanifest`, `web/sw.js` | PWA: instalacja i tryb offline |
| `android/` | Projekt Android: jedno okno WebView ładujące `web/` z assets |
| `android/app/keystore/release.jks` | Klucz do podpisu (hasło `dance-metronom`). Do użytku własnego, nie do Sklepu Play |

Poprawki robi się w `web/index.html`. Ten sam plik trafia do APK i do PWA.

## Budowanie lokalnie

Android Studio → Open → katalog `android/`, albo w terminalu:

```sh
cd android
./gradlew assembleRelease
# APK: android/app/build/outputs/apk/release/app-release.apk
```

Wymaga JDK 17 i Android SDK (platforma 34).
