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

---

## Introduction

This document provides an overview of the vehicle database, including its schema, instances of the tables, and tasks to be performed.

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
| 33333333   | 20        | 2017-06-27  | L         | 49         |
| 44444444   | 10        | 2019-04-10  | D         | 80         |
| 77777777   | 30        | 2020-12-31  | L         | 90         |
| 77777777   | 30        | 2020-10-30  | L         | 40         |
| 66666666   | 40        | 2020-02-03  | D         | 90         |

## Tasks
Task 1:  Create the schema of the remaining three tables (driver, license, and exam tables).

Task 2: Insert the records into all the four tables.

Task 3 Design a simple GUI interface that allows the users to choose from the following options:
* Option 1: Query the license information of specific drivers.
   * The GUI accepts a driver’s name from the console as the input. It outputs the license type, license issue date, license expiry date, and the name of the issued branch of the inquired driver.

* Option 2: Query the exam information of specific drivers.
   * The GUI accepts a driver’s name from the console as the input.  It outputs the exam records, including the branch name, exam date, and exam score of the inquired driver.    

* Option 3: Search the driver information for specific branches.
   * The GUI accepts a branch name from the console as the input.  It outputs the information of all the drivers whose licenses were issued from the inquired branch, including the name, address, city, phone number, and license type of these drivers.     
   
* Option 4: Search the branch information.
   * The GUI accepts a city name from the console as the input.  It outputs the information of all the branches in the inquired city, including the branch name, address, phone number, and the total number of licenses issued by this branch.  For those branches that do not issue any license, output 0 as the total number of licenses.       

* Option 5: Report the drivers with expired licenses.
   * Return the names of the drivers and their phone numbers whose licenses have expired for at least three months by Nov 2, 2023.  

* Option 6: Report data errors in the Exam table:
   * The Exam table has some data errors. Find the following five types of errors. Indicate which type of errors that your output belongs to.       
      * Type I error – Unmatching branch IDs:  Return the names of the drivers whose branch ID of his/her licence does not match the branch ID of any of his/her exams.
      * Type II error – Unmatching issue date:  Return the names of the drivers whose issue date of any of his/her licenses is before the date of the latest exam that he/she has taken.  You do not need to consider the matching between the exam type and licence type.
      * Type III error – Unmatching license type:  Return the names of the drivers whose license type in the License table does not match the exam type of his/her latest exam.
      * Type IV error – Invalid exam score: Return the names of the drivers who did not pass the exam (score > 70) but were issued a license. For those drivers who took multiple exams, consider the highest score for the comparison.  You do not need to consider the matching between the exam type and licence type.
      * Type V error – No exam: Return the names of the drivers who did not take any exam but were issued a license.  
