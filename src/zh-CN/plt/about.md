# 关于编程语言理论

## 概述

## 纲要

- 起源（ `λ-calculus` ）
  - 概念
    - 计算（ `Church-Turing Thesis` ）
    - 计算模型
    - 演绎系统 → 项重写系统（TRS，term rewriting system）
      - `λ-calculus` 与 `Combinatory Logic`
      - `λᵥ-calculus`
        - 与 `λ-calculus` 的关系[见此处的论述](./cbn-vs-cbv-calculus.md)。
        - **注释** 实为当前大部分编程语言的语义基础，见 [[Plo75]](../bibliography.md#Plo75)。
    - 规约系统的子类别（满足某一子类别要求的 TRS，共享一组性质）
      - Regular CRSs，regular combinatory reduction systems，见 [[Kl80]](../bibliography.md#Kl80)。
      - Regular SRSs，regular substitutive reduction systems，见 [[Shu10, Chapter 13]](../bibliography.md#Shu10)。
    - 计算作用（computational effect）
      - 纯（pure）与非纯（impure），根据确定性与可变状态区分。
        - 改变可变状态的计算作用是不纯的，也就是副作用（side effect）。
          - **注释** 控制作用是副作用。
        - 产生确定性的结果，而不产生副作用的函数是纯函数（pure function）。
        - **注释** 特别地，在纯函数式语言中（例如 [Haskell](https://haskell.org)），副作用一般被限制。
      - 代数效应（algebraic effect）是一种建模计算作用的框架，用于灵活地分离，组合与处理计算作用。

**TODO** 补充更多相关信息。
