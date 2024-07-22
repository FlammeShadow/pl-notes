# 定义

## λ-calculus

<details>
Syntax:

```text
c ∈ Constants
x ∈ Variables
T ::= c | x | λx.T | (TT) (Terms)
```

Substitution:

```text
c[x := T] = c
x[x := T] = T
y[x := T] = y, if x ≠ y
(T₁ T₂)[x := T₃] = (T₁[x := T₃])(T₂[x := T₃])
(λx.T₁)[y := T₂] = λx.T₁[y := T₂]
```

Schemata:

```text
λx.T ⟶ λy.T[x := y] (α-renaming)
(λx.T₁)T₂ ⟶ T₁[x := T₂] (β-reduction)
```

Notations:

```text
Λ = T (Terms)

FV: Terms → Variables (Free variables)
FV(x) = {x}
FV(λx.T) = FV(T) - {x}
FV(T₁T₂) = FV(T₁) ∪ FV(T₂)

Sub: Terms → Terms (Subterms)
Sub(x) = {x}
Sub(λx.T) = Sub(T) ∪ {λx.T}
Sub(T₁T₂) = Sub(T₁) ∪ Sub(T₂) ∪ {T₁T₂}

Λ⁰ = T, if FV(T) = ∅ (Closed terms)
Λ⁰(x,...) = { T | FV(T) ∈ {x,...} }
```

</details>

## λI-calculus

<details>

```text

```

</details>

## λδ-calculus

## λᵥ-calculus

**TODO** Under construction.
