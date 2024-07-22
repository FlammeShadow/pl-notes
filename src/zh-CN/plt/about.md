# 关于编程语言理论

## 概述

## 纲要

- 起源（ `λ-calculus` ）
  - 概念
    - 计算（ `Church-Turing Thesis` ）
    - 计算模型
    - [演绎系统 → 项重写系统（TRS，term rewriting system）](./ds-to-trs.md)
      - `λ-calculus` 与 `Combinatory Logic`
      - `λᵥ-calculus`
        - 与 `λ-calculus` 的关系[见此处的论述](./cbn-vs-cbv-calculus.md)。
        - **注释** 实为当前大部分编程语言的语义基础，见 [[Plo75]](../bibliography.md#Plo75)。
    - 计算作用（computational effect）
      - 纯（pure）与非纯（impure），根据确定性与可变状态区分。
        - 改变可变状态的计算作用是不纯的，也就是副作用（side effect）。
          - **注释** 控制作用是副作用。
        - 产生确定性的结果，而不产生副作用的函数是纯函数（pure function）。
        - **注释** 特别地，在纯函数式语言中（例如 [Haskell](https://haskell.org)），副作用一般被限制。
      - 代数效应（algebraic effect）是一种建模计算作用的框架，用于灵活地分离，组合与处理计算作用。
    - [类型系统](./type-system.md)
      - **澄清** 众所周知的 **强/弱类型** 的说法实际上并不准确，大部分人对强/弱类型的认知实质上与动态/静态定型和类型检查有关，但是非常模糊，也缺乏准确的度量方法。因此，这并不是一个良构的术语。
      - 动态/静态类型（dynamic/static typing）。

**TODO** 补充更多相关信息。
