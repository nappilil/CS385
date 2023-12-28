# VehicleOffice Database

## Table of Contents

1. [Introduction](#introduction)
2. [Schema](#schema)
3. [Table Instances](#table-instances)
   - [Branch Table](#branch-table)
   - [Driver Table](#driver-table)
   - [License Table](#license-table)
   - [Exam Table](#exam-table)
4. [Tasks](#tasks)
   - [Creating Schema](#creating-schema)
   - [Data Input](#data-input)
   - [Query Design](#query-design)

---

## Introduction

Welcome to the README for the VehicleOffice database. This document provides an overview of the database, including its schema, instances of the tables, and tasks to be performed.

## Schema

The VehicleOffice database consists of four tables:

1. **Branch**
   - branch_id (integer)
   - branch_name (varchar(20))
   - branch_addr (varchar(50))
   - branch_city (varchar(20))
   - branch_phone (integer)

2. **Driver**
   - driver_ssn (integer)
   - driver_name (varchar(20))
   - driver_addr (varchar(50))
   - driver_city (varchar(20))
   - driver_birthdate (date)
   - driver_phone (integer)

3. **License**
   - license_no (integer)
   - driver_ssn (integer)
   - license_type (char)
   - license_class (integer)
   - license_expiry (date)
   - issue_date (date)
   - branch_id (integer)

4. **Exam**
   - driver_ssn (integer)
   - branch_id (integer)
   - exam_date (date)
   - exam_type (char)
   - exam_score (integer)

## Table Instances

### Branch Table

| Branch_id | Branch_name      | Branch_addr         | Branch_city | Branch_phone |
|-----------|------------------|---------------------|-------------|--------------|
| 10        | Main Hoboken     | 1234 Main St.       | Hoboken     | 5551234      |
| 20        | NYC 33rd street  | 2320 33rd street    | NYC         | 5552331      |
| 30        | West Creek       | 251 Creek Rd.       | Newark      | 5552511      |
| 40        | Blenheim         | 1342 W.22 Ave.      | Princeton   | 5551342      |
| 50        | NYC 98 street    | 340 98th street     | NYC         | 5214202      |
| 60        | NYC 4th street   | 21 4th street       | NYC         | 5214809      |

### Driver Table

| Driver_ssn | Driver_name      | Driver_addr          | Driver_city | Driver_birthdate | Driver_phone |
|------------|------------------|----------------------|-------------|-------------------|--------------|
| 11111111   | Bob Smith        | 111 E.11 Street      | Hoboken     | 1975-01-01        | 5551111      |
| 22222222   | John Walters     | 222 E.22 St.         | Princeton   | 1976-02-02        | 5552222      |
| 33333333   | Troy Rops        | 333 W 33 Ave         | NYC         | 1970-03-03        | 5553333      |
| 44444444   | Kevin Mark       | 444 E.4 Ave.         | Hoboken     | 1974-04-04        | 5554444      |
| 55555555   | Amelie Kim       | 63 Main street       | Hoboken     | 2000-09-10        | 5551456      |
| 66666666   | Mary Gup          | 47 W 13th street     | NYC         | 1998-12-31        | 5552315      |
| 77777777   | Clark Johnson    | 36 east 8th street   | NYC         | 1999-10-01        | 5559047      |

### License Table

| License_no | Driver_ssn | License_type | License_class | License_expiry | Issue_date  | Branch_id |
|------------|------------|--------------|---------------|-----------------|-------------|-----------|
| 1          | 11111111   | D            | 5             | 2022-05-24      | 2017-05-25  | 20        |
| 2          | 22222222   | D            | 5             | 2023-09-29      | 2016-08-29  | 40        |
| 3          | 33333333   | L            | 5             | 2022-12-27      | 2017-06-27  | 20        |
| 4          | 44444444   | D            | 5             | 2022-08-30      | 2017-08-30  | 40        |
| 5          | 77777777   | D            | 3             | 2025-08-17      | 2020-08-17  | 50        |
| 6          | 66666666   | D            | 1             | 2024-01-12      | 2020-01-11  | 50        |
| 7          | 44444444   | L            | 5             | 2023-01-31      | 2020-12-31  | 30        |

### Exam Table

| Driver_ssn | Branch_id | Exam_date   | Exam_type | Exam_score |
|------------|-----------|-------------|-----------|------------|
| 11111111   | 20        | 2017-05-25  | D         | 79         |
| 22222222   | 30        | 2016-05-06  | L         | 25         |
| 22222222   | 40        | 2016-06-10  | L         | 51         |
| 33333333   | 10        | 2017-07-07  | L         | 45         |
| 33333333   | 20        | 2017-07-27  | L         | 61         |
| 44444444   | 10        | 2017-07-27  | L         | 71         |
| 44444444   | 20        | 2017-08-30  | L         | 65         |
| 44444444   | 40        | 2017-09-01  | L         | 82         |
| 11111111   | 20        | 2017-12-02  | L         | 67         |
| 22222222   | 40        | 2016-08-29  | D         | 81         |
|
