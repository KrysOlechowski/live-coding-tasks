# Task Review

## Requirement check

- Meets the task requirements: partially
- Dopasowanie po ID, wykrywanie dodanych/usuniętych produktów, porównywanie nazwy i ceny oraz zachowanie wejścia działają. `added` i `removed` zachowują wymagane kolejności.
- Brakuje poprawnej kolejności `changed` oraz oczekiwanego czasu `O(n + m)`.
- Próba zakończona na prośbę kandydata podczas Core. Nierozpoczęty follow-up pominięto; jego wymagania nie wpływają na ocenę.
- Weryfikacja: 8/9 ukierunkowanych sprawdzeń zachowania przeszło; przypadek kolejności zmian nie przeszedł. Sprawdzenia używały zamrożonych wejść. Kompilator TypeScript w trybie strict nie zgłosił błędów dla pliku zadania.

## Mastery

Level: 2/5 — Partially working

Reason: Podstawowa klasyfikacja produktów działa, ale dwa istotne wymagania — kolejność zmian i liniowe porównanie list — pozostają niespełnione; samodzielna analiza pamięci oraz przełożenie indeksowania na kod wymagają dalszej praktyki.

## Weaknesses

- `main.ts:36`: `unshift` podczas iteracji po `previous` odwraca kolejność znalezionych zmian, zamiast zachować kolejność z `current`. Gdy obie listy mają kolejność A, B i oba produkty zmieniły cenę, wynik ma B, A; kolejność zbierania zmian powinna wynikać z `current`.
- `main.ts:23` i `main.ts:42`: każde `find` przeszukuje drugą listę wewnątrz pętli, więc najgorszy koszt pozostaje `O(n*m + n + m)`, zamiast oczekiwanego `O(n + m)`. Potrzebny jest dobór indeksu do wielokrotnego wyszukiwania po ID; podczas checkpointu rozpoznano koszt mnożenia, ale koszt pojedynczego odczytu z hash table został pomylony z kosztem całego porównania, a pamięć wymagała wyjaśnienia.

## Strengths

- Poprawne dopasowanie po ID i porównanie wartości `name`/`priceCents`; osobne obiekty o identycznych danych nie tworzą fałszywych zmian.
- Działają puste listy, dodanie/usunięcie wszystkich produktów, zmiana ID oraz rozróżnianie wielkości liter w ID.
- Kod nie zmienia wejściowych tablic ani rekordów; prawidłowo wykorzystuje referencje do produktów w wyniku.
- Kandydat poprawnie wskazał, że do wykrywania dodania/usunięcia wystarcza sprawdzenie obecności ID.

## Missed edge cases

- none

## What a stronger candidate would improve

- Wybrałby źródło iteracji zgodnie z wymaganą kolejnością wyniku i sprawdził tę regułę na co najmniej dwóch zmienionych produktach.
- Uzasadniłby czas budowania indeksu, koszt wyszukiwania oraz pamięć pomocniczą i pamięć wyniku osobno.

## Main learning takeaway

- Kolejność iteracji decyduje o kolejności wyniku, a struktura użyta do wyszukiwania decyduje o koszcie dopasowania — trzeba świadomie zaplanować obie rzeczy.

## Suggested next step

- W osobnym małym ćwiczeniu zbuduj `Map<string, Product>` dla trzech produktów i odczytaj jeden produkt po ID, wyjaśniając, co jest kluczem, a co wartością.

## Follow-up questions

- Dlaczego odwrócenie kolejności znalezionych zmian nie gwarantuje kolejności z drugiej listy?
- Jaki koszt ponosisz przy budowaniu indeksu, a jaki przy pojedynczym późniejszym odczycie?

## Final verdict

Zadanie jest częściowo rozwiązane. Działa podstawowe porównanie danych; przed kolejną pełną próbą warto osobno przećwiczyć indeksowanie po ID i budowanie wyniku w zadanej kolejności. Ocena wynika z zachowania kodu i ujawnionych luk, a nie z samej decyzji o zakończeniu próby ani liczby podpowiedzi.
