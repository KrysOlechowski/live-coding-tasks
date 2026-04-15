## Obszary focusu

- porównywanie częstotliwości
- zasady normalizacji stringów
- wczesne wykrywanie niedopasowania

## Zadanie

Otrzymujesz dwa stringi. Zaimplementuj funkcję, która zwraca informację, czy są one anagramami.

Dwa stringi są anagramami, jeśli po zastosowaniu opisanych poniżej zasad porównania zawierają dokładnie te same znaki w tych samych liczbach wystąpień.

## Oczekiwane wejście / wyjście

- Wejście:
  - `first: string`
  - `second: string`
- Wyjście:
  - `true`, jeśli stringi są anagramami
  - `false` w przeciwnym razie

Porównuj znaki po zamianie obu stringów na małe litery. Całkowicie ignoruj spacje. Zachowaj niemutowalność danych wejściowych.

## Wymagania

- Zwróć `true` tylko wtedy, gdy oba znormalizowane stringi zawierają dokładnie te same znaki w tych samych liczbach wystąpień
- Przed porównaniem zamień oba stringi na małe litery
- Ignoruj wszystkie znaki spacji
- Nie ignoruj znaków interpunkcyjnych ani cyfr
- Jeśli znormalizowane stringi mają różne długości, zwróć `false`
- Funkcja ma pozostać czysta

## Opcjonalne edge case'y

- oba stringi są puste
- stringi różnią się tylko wielkością liter
- stringi zawierają powtarzające się litery
- stringi zawierają znaki interpunkcyjne, przez które nie są anagramami

## Poza zakresem

- zamiana wielkości liter zależna od locale
- ignorowanie znaków interpunkcyjnych
- normalizacja Unicode
- zwracanie szczegółów o niedopasowaniu
