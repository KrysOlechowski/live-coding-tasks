# Task Review

## Requirement check

- Meets the task requirements: yes
- Implementacja poprawnie buduje nowy indeks ID → Product i odczytuje wartości po kluczu. Obsługuje pustą listę, brak ID i wielkość liter, nie zmienia wejścia ani indeksu podczas odczytów.
- Koszty kodu odpowiadają wymaganiom: oczekiwane O(n) budowy, średnie O(1) odczytu przy założeniach zadania i O(n) pamięci indeksu. Analizę tych kosztów omówiono z pomocą podczas checkpointu.
- Brak błędów funkcjonalnych do poprawienia. Kod jest zgodny z wersją sprawdzoną w checkpoincie: strict TypeScript oraz sprawdzenia indeksowania wszystkich produktów, istniejących i brakujących kluczy, pustego wejścia, kolejnych odczytów, świeżych indeksów i zachowania zamrożonych danych przeszły.

## Mastery

Level: 3/5 — Mostly working

Reason: Implementacja jest poprawna i czytelna; do samodzielnego wyjaśnienia kosztu budowy indeksu i pojedynczego odczytu potrzebne było doprecyzowanie, choć późniejsza odpowiedź pokazała postęp.

## Weaknesses

- `main.ts:10` i `main.ts:20`: główna luka dotyczy wyjaśnienia poprawnie napisanego kodu. W checkpoincie koszt budowy był nieznany, a odczyt przez `get` oceniono jako O(n); po wyjaśnieniu poprawnie połączono przebudowę i odczyt jako O(n) + O(1). Warto utrwalić rozdzielanie tych operacji oraz pamięci indeksu i tymczasowej tablicy par.

## Strengths

- `main.ts:11`: każdy wpis łączy ID z pełnym produktem; budowanie indeksu obejmuje wszystkie elementy i nie kopiuje niepotrzebnie całych rekordów.
- `main.ts:20`: odczyt używa istniejącego indeksu, bez skanowania lub ponownej budowy, i naturalnie zwraca `undefined` przy braku klucza.
- Krótki kod z poprawnymi typami, bez mutacji danych wejściowych i bez zbędnych warunków specjalnych.
- Po omówieniu kosztów kandydat poprawnie rozpoznał dodatkowy koszt przebudowy indeksu przed każdym odczytem.

## Missed edge cases

- none

## What a stronger candidate would improve

- Samodzielnie uzasadniłby oczekiwane O(n) budowy i średnie O(1) odczytu, wskazując konkretne operacje w kodzie.
- Zauważyłby, że `products.map(...)` tworzy tymczasową tablicę par o pamięci O(n). Jest to dopuszczalne rozwiązanie i nie wymaga zmiany w tym zadaniu.

## Main learning takeaway

- Koszt przygotowania indeksu i koszt korzystania z niego analizuj osobno; korzyść z indeksu bierze się z jego ponownego użycia.

## Suggested next step

- Bez zaglądania do wcześniejszych odpowiedzi rozpisz koszt jednego zbudowania indeksu dla n produktów i wykonania k odczytów z tego samego indeksu, wskazując, które operacje wykonujesz raz, a które k razy.

## Follow-up questions

- Jaki jest łączny koszt jednego zbudowania indeksu i k kolejnych odczytów?
- Czy pamięć indeksu byłaby stała, gdyby przechowywał wyłącznie referencje do istniejących produktów?

## Final verdict

Zadanie zaimplementowane poprawnie. Następnym krokiem jest utrwalenie uzasadnienia złożoności; nie ma potrzeby przepisywania działających funkcji. Mastery odzwierciedla samodzielność wyjaśnienia, a nie automatyczne odjęcie punktów za pomoc.
