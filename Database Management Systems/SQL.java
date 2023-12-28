import java.sql.*;
import java.util.Scanner;


public class example {
   // JDBC driver name and database URL
   static final String JDBC_DRIVER = "com.mysql.jdbc.Driver";
   static final String DB_URL = "jdbc:mysql://localhost";

   //  Database credentials
   static final String USER = "root";
   //the user name; You can change it to your username (by default it is root).
   static final String PASS = "root";
   //the password; You can change it to your password (the one you used in MySQL server configuration).

   public static void main(String[] args) {
   Connection conn = null;
   Statement stmt = null;
   try{
      //STEP 1: Register JDBC driver
      Class.forName("com.mysql.cj.jdbc.Driver");

      //STEP 2: Open a connection to database
      System.out.println("Connecting to database...");

      conn = DriverManager.getConnection(DB_URL, USER, PASS);
      
      System.out.println("Creating database...");
      stmt = conn.createStatement();

      //STEP 3: Use SQL to Create Database;
      String sql = "CREATE DATABASE IF NOT EXISTS VehicleOffice";
      stmt.executeUpdate(sql);
      System.out.println("Database created successfully...");

      //STEP 4: Use SQL to select the database;
      sql = "use VehicleOffice";
      stmt.executeUpdate(sql);

     //STEP 5: Use SQL to create Tables;
     //STEP 5.1: Create Table Branch;
      sql = "create table IF NOT EXISTS branch( branch_id integer not null PRIMARY KEY, " +
      		"branch_name varchar(20) not null," +
      		"branch_addr varchar(50) not null," +
      		"branch_city varchar(20) not null," +
      		"branch_phone integer not null)";
      stmt.executeUpdate(sql);

      //STEP 5.2: Create Driver Table;
      //Your Task 1!
      sql = "create table IF NOT EXISTS driver( " +
    		"driver_ssn integer not null, " +
    		"driver_name varchar(20) not null," +
        	"driver_addr varchar(50) not null," +
        	"driver_city varchar(20) not null," +
        	"driver_birthdate date not null," +
        	"driver_phone integer not null," +
        	"PRIMARY KEY (driver_ssn))";
        stmt.executeUpdate(sql);


     //STEP 5.3: Create License Table;
     //Your Task 1!
     sql = "create table IF NOT EXISTS license( " +
    		"license_no integer not null, " +
        	"driver_ssn integer not null," +
        	"license_type char not null," +
        	"license_class integer not null," +
        	"license_expiry date not null," +
        	"issue_date date not null," +
        	"branch_id integer not null," + 
        	"PRIMARY KEY (license_no)," +
        	"FOREIGN KEY (branch_id) REFERENCES branch(branch_id)," +
        	"FOREIGN KEY (driver_ssn) REFERENCES driver(driver_ssn))";
     stmt.executeUpdate(sql);

      //STEP 5.4: Create Exam Table;
      //Your Task 1!
      sql = "create table IF NOT EXISTS exam( " +
      		"driver_ssn integer not null, " +
  		    "branch_id integer not null, " +
  		    "exam_date date not null, " +
            "exam_type char not null," +
            "exam_score integer not null," +
  		    "PRIMARY KEY (driver_ssn, branch_id, exam_date)," +
            "FOREIGN KEY (driver_ssn) REFERENCES driver(driver_ssn)," +
            "FOREIGN KEY (branch_id) REFERENCES branch(branch_id))";
     stmt.executeUpdate(sql);



       //STEP 6: Use SQL to insert tuples into tables;
       //STEP 6.1: insert tuples into Branch table;
      	sql = "insert into branch values(10, 'Main Hoboken', '1234 Main St.', 'Hoboken', 5551234)";
        //stmt.executeUpdate(sql);

       //Your Task 2: insert the rest of tuples into the Branch table;
      	sql = "insert into branch values(20, 'NYC 33rd street', '2320 33rd street', 'NYC', 5552331)";
      	//stmt.executeUpdate(sql);
        sql = "insert into branch values(30, 'West Creek', '251 Creek Rd.', 'Newark', 5552511)";
        //stmt.executeUpdate(sql);
        sql = "insert into branch values(40, 'Blenheim', '1342 W.22 Ave.', 'Princeton', 5551342)";
        //stmt.executeUpdate(sql);
        sql = "insert into branch values(50, 'NYC 98 street', '340 98th street', 'NYC', 5214202)";
        //stmt.executeUpdate(sql);
        sql = "insert into branch values(60, 'NYC 4th street', '21 4th street', 'NYC', 5214809)";
        //stmt.executeUpdate(sql);
        
       //STEP 6.2: insert tuples into the driver table;
      //Your Task 2: insert all tuples into the driver table;
    	sql = "insert into driver values(11111111, 'Bob Smith', '111 E.11 Street', 'Hoboken', '1975-01-01', 5551111)";
    	//stmt.executeUpdate(sql);
        sql = "insert into driver values(22222222, 'John Walters', '222 E.22 St.', 'Princeton', '1976-02-02', 5552222)";
        //stmt.executeUpdate(sql);
        sql = "insert into driver values(33333333, 'Troy Rops', '333  W 33 Ave', 'NYC', '1970-03-03', 5553333)";
        //stmt.executeUpdate(sql);
        sql = "insert into driver values(44444444, 'Kevin Mark', '444 E.4 Ave.', 'Hoboken', '1974-04-04', 5554444)";
        //stmt.executeUpdate(sql);
        sql = "insert into driver values(55555555, 'Amelie Kim', '63 Main street', 'Hoboken', '2000-09-10', 5551456)";
        //stmt.executeUpdate(sql);
        sql = "insert into driver values(66666666, 'Mary Gup', '47 W 13th street', 'NYC', '1998-12-31', 5552315)";
        //stmt.executeUpdate(sql);
        sql = "insert into driver values(77777777, 'Clark Johnson', '36 east 8th street', 'NYC', '1999-10-01', 5559047)";
        //stmt.executeUpdate(sql);
        
      //STEP 6.3: insert tuples into the license table;
      //Your Task 2: insert all tuples into the license table;
        sql = "insert into license values(1, 11111111, 'D', 5, '2022-05-24', '2017-05-25', 20)";
        //stmt.executeUpdate(sql);
        sql = "insert into license values(2, 22222222, 'D', 5, '2023-09-29', '2016-08-29', 40)";
        //stmt.executeUpdate(sql);
        sql = "insert into license values(3, 33333333, 'L', 5, '2022-12-27', '2017-06-27', 20)";
        //stmt.executeUpdate(sql);
        sql = "insert into license values(4, 44444444, 'D', 5, '2022-08-30', '2017-08-30', 40)";
        //stmt.executeUpdate(sql);
        sql = "insert into license values(5, 77777777, 'D', 3, '2025-08-17', '2020-08-17', 50)";
        //stmt.executeUpdate(sql);
        sql = "insert into license values(6, 66666666, 'D', 1, '2024-01-12', '2020-01-11', 50)";
        //stmt.executeUpdate(sql);
        sql = "insert into license values(7, 44444444, 'L', 5, '2023-1-31', '2020-12-31', 30)";
        //stmt.executeUpdate(sql);
      
        //STEP 6.4: insert all tuples into the exam table;
        //Your Task 2: insert all tuples into the exam table;
        sql = "insert into exam values(11111111, 20, '2017-05-25', 'D', 79)";
        //stmt.executeUpdate(sql);
        sql = "insert into exam values(22222222, 30, '2016-05-06', 'L', 25)";
        //stmt.executeUpdate(sql);
        sql = "insert into exam values(22222222, 40, '2016-06-10', 'L', 51)";
        //stmt.executeUpdate(sql);
        sql = "insert into exam values(33333333, 10, '2017-07-07', 'L', 45)";
        //stmt.executeUpdate(sql);
        sql = "insert into exam values(33333333, 20, '2017-07-27', 'L', 61)";
        //stmt.executeUpdate(sql);
        sql = "insert into exam values(44444444, 10, '2017-07-27', 'L', 71)";
        //stmt.executeUpdate(sql);
        sql = "insert into exam values(44444444, 20, '2017-08-30', 'L', 65)";
        //stmt.executeUpdate(sql);
        sql = "insert into exam values(44444444, 40, '2017-09-01', 'L', 82)";
        //stmt.executeUpdate(sql);
        sql = "insert into exam values(11111111, 20, '2017-12-02', 'L', 67)";
        //stmt.executeUpdate(sql);
        sql = "insert into exam values(22222222, 40, '2016-08-29', 'D', 81)";
        //stmt.executeUpdate(sql);
        sql = "insert into exam values(33333333, 20, '2017-06-27', 'L', 49)";
        //stmt.executeUpdate(sql);
        sql = "insert into exam values(44444444, 10, '2019-04-10', 'D', 80)";
        //stmt.executeUpdate(sql);
        sql = "insert into exam values(77777777, 30, '2020-12-31', 'L', 90)";
        //stmt.executeUpdate(sql);
        sql = "insert into exam values(77777777, 30, '2020-10-30', 'L', 40)";
        //stmt.executeUpdate(sql);
        sql = "insert into exam values(66666666, 40, '2020-02-03', 'D', 90)";
        //stmt.executeUpdate(sql);
        
        
        //STEP 7: Use SQL to ask queries and retrieve data from the tables;
        //An example to retrieve branch ID, name, address from Table Branch, and display these values;
        
        // BRANCH TABLE
        try {
        Statement s = conn.createStatement ();
        s.executeQuery ("SELECT branch_id, branch_name, branch_addr, branch_city, branch_phone FROM branch");
        ResultSet rs = s.getResultSet ();
        int count = 0;
        while (rs.next ())
        {
            int idVal = rs.getInt ("branch_id");
            String nameVal = rs.getString ("branch_name");
            String addrVal = rs.getString ("branch_addr");
            if (rs.wasNull()) {
            	addrVal = "(no address available)";
            }
            String cityVal = rs.getString("branch_city");
            String phoneVal = rs.getString("branch_phone");
            if (rs.wasNull()) {
            	phoneVal = "(no phone number available)";
            }
            System.out.println (
                    "branch id = " + idVal
                    + ", branch name = " + nameVal
                    + ", branch address = " + addrVal
                    + ", branch city = " + cityVal
                    + ", branch phone = " + phoneVal);
            ++count;
        }
        rs.close ();
        s.close ();
        System.out.println (count + " rows were retrieved");
        } catch (SQLException e) {
        	System.err.println("Error message:" + e.getMessage());
        	System.err.println("Error number:" + e.getErrorCode()); 
        }
        
        // DRIVER TABLE
        try {
        Statement s1 = conn.createStatement ();
        s1.executeQuery ("SELECT driver_ssn, driver_name, driver_addr, driver_city, driver_birthdate, driver_phone FROM driver");
        ResultSet rs1 = s1.getResultSet ();
        int count1 = 0;
        while (rs1.next ())
        {
            int ssnVal = rs1.getInt ("driver_ssn");
            String nameVal = rs1.getString ("driver_name");
            String addrVal = rs1.getString ("driver_addr");
            if (rs1.wasNull()) {
            	addrVal = "(no address available)";
            }
            String cityVal = rs1.getString ("driver_city");
            String birthVal = rs1.getString ("driver_birthdate");
            String phoneVal = rs1.getString ("driver_phone");
            if (rs1.wasNull()) {
            	phoneVal = "(no phone number available)";
            }
            System.out.println (
                    "driver ssn = " + ssnVal
                    + ", driver name = " + nameVal
                    + ", driver address = " + addrVal
                    + ", driver city = " + cityVal
                    + ", driver birthdate = " + birthVal
                    + ", driver phone number = " + phoneVal);
            ++count1;
        }
        rs1.close ();
        s1.close ();
        System.out.println (count1 + " rows were retrieved");
        } catch (SQLException e) {
            System.err.println ("Error message: " + e.getMessage ());      
            System.err.println ("Error number: " + e.getErrorCode ());
        }
        
        // LICENSE TABLE
        try {
        Statement s2 = conn.createStatement ();
        s2.executeQuery ("SELECT license_no, driver_ssn, license_type, license_class, license_expiry, issue_date, branch_id FROM license");
        ResultSet rs2 = s2.getResultSet ();
        int count2 = 0;
        while (rs2.next ())
        {
            int noVal = rs2.getInt ("license_no");
            int ssnVal = rs2.getInt ("driver_ssn");
            String typeVal = rs2.getString ("license_type");
            int classVal = rs2.getInt ("license_class");
            String expiryVal = rs2.getString ("license_expiry");
            String issueVal = rs2.getString ("issue_date");
            int idVal = rs2.getInt ("branch_id");
            System.out.println (
                    "license no = " + noVal
                    + ", driver ssn = " + ssnVal
                    + ", license type = " + typeVal
                    + ", license class = " + classVal
                    + ", expiry date = " + expiryVal
                    + ", date issued = " + issueVal
                    + ", branch id = " + idVal);
            ++count2;
        }
        rs2.close ();
        s2.close ();
        System.out.println (count2 + " rows were retrieved");
        } catch (SQLException e) {
            System.err.println ("Error message: " + e.getMessage ());      
            System.err.println ("Error number: " + e.getErrorCode ());
        }
        
        // EXAM TABLE
        try {
        Statement s3 = conn.createStatement ();
        s3.executeQuery ("SELECT driver_ssn, branch_id, exam_date, exam_type, exam_score FROM exam");
        ResultSet rs3 = s3.getResultSet ();
        int count3 = 0;
        while (rs3.next ())
        {
            int ssnVal = rs3.getInt ("driver_ssn");
            int idVal = rs3.getInt ("branch_id");
            String dateVal = rs3.getString ("exam_date");
            String typeVal = rs3.getString ("exam_type");
            if (rs3.wasNull()) {
            	typeVal = "(no exam type available)";
            }
            int scoreVal = rs3.getInt ("exam_score");
            System.out.println (
                    "driver ssn = " + ssnVal
                    + ", branch id = " + idVal
                    + ", exam date = " + dateVal
                    + ", exam type = " + typeVal
                    + ", exam score = " + scoreVal);
            ++count3;
        }
        rs3.close ();
        s3.close ();
        System.out.println (count3 + " rows were retrieved");
        } catch (SQLException e) {
            System.err.println ("Error message: " + e.getMessage ());      
            System.err.println ("Error number: " + e.getErrorCode ());   
        }
        

        
        //Your Task 7: Generate the GUI that supports six options (as indicated in the instructions).

        for (int i = 1; i <= 6; i++) {
        	String option = "Option " + i;
            System.out.println(option);
        }
        System.out.println("Option Numbers are 1-6, Input 0 To Exit ");
        Scanner reader = new Scanner(System.in);
        while (true) {
        	System.out.println("Choose an option number: ");
        	int option = reader.nextInt();
        	reader.nextLine();
        	if (option == 0) {
        		reader.close();
        		break;
        	}
        	// OPTION 1
        	else if (option == 1) {
		        // OPTION 1: Query license information of specific drivers
	            System.out.println("Input a Driver Name: ");
	            String userInput = reader.nextLine();
	        	try {
	        		Statement s4 = conn.createStatement ();
	        		s4.executeQuery ("SELECT license_type, issue_date, license_expiry, branch_name "
									+ "FROM license NATURAL JOIN branch NATURAL JOIN driver  "
									+ "WHERE driver_name='" + userInput + "'");
	        	    ResultSet rs4 = s4.getResultSet ();
	        	    while (rs4.next ())
	        	    {
	        	    	String typeVal = rs4.getString ("license_type");
	        	        String issueVal = rs4.getString ("issue_date");
	        	        String expireVal = rs4.getString ("license_expiry");
	        	        String nameVal = rs4.getString ("branch_name");
	        	        System.out.println (
	        	                    "license_type = " + typeVal
	        	                    + ", issued = " + issueVal
	        	                    + ", expiry date = " + expireVal
	        	                    + ", branch name = " + nameVal);
	        	        }
	        	        rs4.close ();
	        	        s4.close ();
						} catch (SQLException e1) {
				            System.err.println ("Error message: " + e1.getMessage ());      
				            System.err.println ("Error number: " + e1.getErrorCode ());   
				        }
	        	}

        	// OPTION 2
        	else if (option == 2) {
		        // OPTION 2: Query license information of specific drivers
	            System.out.println("Input a Driver Name: ");
	            String userInput = reader.nextLine();
	        	try {
	        		Statement s5 = conn.createStatement ();
	        		s5.executeQuery ("SELECT branch_name, exam_date, exam_score "
									+ "FROM driver NATURAL JOIN exam NATURAL JOIN branch   "
									+ "WHERE driver_name='" + userInput + "'");
	        	    ResultSet rs5 = s5.getResultSet ();
	        	    while (rs5.next ())
	        	    {
	        	    	String nameVal = rs5.getString ("branch_name");
	        	        String dateVal = rs5.getString ("exam_date");
	        	        int scoreVal = rs5.getInt ("exam_score");
	        	        System.out.println (
	        	                    "branch name = " + nameVal
	        	                    + ", exam date = " + dateVal
	        	                    + ", exam score = " + scoreVal);
	        	        }
	        	        rs5.close ();
	        	        s5.close ();
						} catch (SQLException e1) {
				            System.err.println ("Error message: " + e1.getMessage ());      
				            System.err.println ("Error number: " + e1.getErrorCode ());   
				        }
	        	}
        	
        	// OPTION 3
        	else if (option == 3) {
                // OPTION 3: Search the driver information for specific branches
	            System.out.println("Input a Branch Name: ");
	            String userInput = reader.nextLine();
	        	try {
	        		Statement s5 = conn.createStatement ();
	        		s5.executeQuery ("SELECT driver_name, driver_addr, driver_city, driver_phone, license_type "
									+ "FROM driver NATURAL JOIN license NATURAL JOIN branch   "
									+ "WHERE branch_name='" + userInput + "'");
	        	    ResultSet rs5 = s5.getResultSet ();
	        	    while (rs5.next ())
	        	    {
	        	    	String nameVal = rs5.getString ("driver_name");
	        	        String addrVal = rs5.getString ("driver_addr");
	        	        String cityVal = rs5.getString ("driver_city");
	        	        String phoneVal = rs5.getString ("driver_phone");
	        	        String typeVal = rs5.getString ("license_type");
	        	        System.out.println (
	        	                    "driver name = " + nameVal
	        	                    + ", driver address = " + addrVal
	        	                    + ", driver city = " + cityVal
	        	                    + ", driver phone number = " + phoneVal
	        	                    + ", license type = " + typeVal);
	        	        }
	        	        rs5.close ();
	        	        s5.close ();
						} catch (SQLException e1) {
				            System.err.println ("Error message: " + e1.getMessage ());      
				            System.err.println ("Error number: " + e1.getErrorCode ());   
				        }
	        	}
        	
        	// OPTION 4
        	else if (option == 4) {
                // OPTION 4: Search the branch information
	            System.out.println("Input a Branch City: ");
	            String userInput = reader.nextLine();
	        	try {
	        		Statement s5 = conn.createStatement ();
	        		s5.executeQuery ("SELECT B.branch_name, B.branch_addr, B.branch_phone, "
	        						+ "(SELECT COUNT(*) FROM license L WHERE L.branch_id = B.branch_id) AS temp "
	        						+ "FROM branch B "
									+ "WHERE B.branch_city='" + userInput + "'");
	        	    ResultSet rs5 = s5.getResultSet ();
	        	    while (rs5.next ())
	        	    {
	        	    	String nameVal = rs5.getString ("branch_name");
	        	        String addrVal = rs5.getString ("branch_addr");
	        	        String phoneVal = rs5.getString ("branch_phone");
	        	        int numVal = rs5.getInt ("temp");
		        	    // FIX IF NO LICENSES WERE ISSUED
	        	        System.out.println (
	        	                    "branch name = " + nameVal
	        	                    + ", branch address = " + addrVal
	        	                    + ", branch phone number = " + phoneVal
	        	                    + ", licenses issued = " + numVal);
	        	        }
	        	        rs5.close ();
	        	        s5.close ();
						} catch (SQLException e1) {
				            System.err.println ("Error message: " + e1.getMessage ());      
				            System.err.println ("Error number: " + e1.getErrorCode ());   
				        }
	        	}
             
        	// OPTION 5
        	else if (option == 5) {
                // OPTION 5: Report the drivers with expired licenses
	        	try {
	        		Statement s5 = conn.createStatement ();
	        		s5.executeQuery ("SELECT DISTINCT driver_name, driver_phone "
									+ "FROM driver NATURAL JOIN license "
									+ "WHERE license_expiry<='2023-08-02'");
	        	    ResultSet rs5 = s5.getResultSet ();
	        	    while (rs5.next ())
	        	    {
	        	    	String nameVal = rs5.getString ("driver_name");
	        	        String phoneVal = rs5.getString ("driver_phone");
	        	        System.out.println (
	        	                    "driver name = " + nameVal
	        	                    + ", driver phone number = " + phoneVal);
	        	        }
	        	        rs5.close ();
	        	        s5.close ();
						} catch (SQLException e1) {
				            System.err.println ("Error message: " + e1.getMessage ());      
				            System.err.println ("Error number: " + e1.getErrorCode ());   
				        }
	        	}
        
        	// OPTION 6
        	else if (option == 6) {
                // OPTION 6: Report the errors in the Exam table
	        	try {
	        		Statement s1 = conn.createStatement ();
	        		s1.executeQuery ("SELECT DISTINCT D.driver_name "
									+ "FROM driver D NATURAL JOIN license L, exam E "
									+ "WHERE L.branch_id <> E.branch_id AND "
									+ "L.driver_ssn = E.driver_ssn AND "
									+ "NOT EXISTS (SELECT 1 "
									+ "FROM exam E2 "
									+ "WHERE L.branch_id = E2.branch_id AND L.driver_ssn = E2.driver_ssn)");
	        	    ResultSet rs1 = s1.getResultSet ();
	        	    System.out.println("Type I Error - Unmatching Branch IDs");
	        	    while (rs1.next ())
	        	    {
	        	    	String nameVal = rs1.getString ("driver_name");
	        	        System.out.println (
	        	                    "driver name = " + nameVal);
	        	        }
	        	        rs1.close ();
	        	        s1.close ();
						} catch (SQLException e1) {
				            System.err.println ("Error message: " + e1.getMessage ());      
				            System.err.println ("Error number: " + e1.getErrorCode ());   
				        }
	        	try {
	        		Statement s2 = conn.createStatement ();
	        		s2.executeQuery ("SELECT DISTINCT D.driver_name "
	        					   + "FROM driver D NATURAL JOIN license L, exam E "
	        					   + "WHERE L.driver_ssn = E.driver_ssn AND "
	        					   + "L.issue_date < E.exam_date "
	        					   + "GROUP BY E.exam_date, E.driver_ssn "
	        					   + "HAVING MAX(E.exam_date)");
									
	        	    ResultSet rs2 = s2.getResultSet ();
	        	    System.out.println("Type II Error - Unmatching Issue Date");
	        	    while (rs2.next ())
	        	    {
	        	    	String nameVal = rs2.getString ("driver_name");
	        	        System.out.println (
	        	                    "driver name = " + nameVal);
	        	        }
	        	        rs2.close ();
	        	        s2.close ();
						} catch (SQLException e1) {
				            System.err.println ("Error message: " + e1.getMessage ());      
				            System.err.println ("Error number: " + e1.getErrorCode ());   
				        }
	        	try {
	        		Statement s3 = conn.createStatement ();
	        		s3.executeQuery ("SELECT DISTINCT D.driver_name "
	        					   + "FROM driver D NATURAL JOIN license L, exam E "
							       + "WHERE L.license_type <> E.exam_type AND "
							       + "L.driver_ssn = E.driver_ssn AND "
	        					   + "E.exam_date = (SELECT MAX(E2.exam_date) FROM exam E2 WHERE driver_ssn = D.driver_ssn)");
	        	    ResultSet rs3 = s3.getResultSet ();
	        	    System.out.println("Type III Error - Unmatching License Type");
	        	    while (rs3.next ())
	        	    {
	        	    	String nameVal = rs3.getString ("driver_name");
	        	        System.out.println (
	        	                    "driver name = " + nameVal);
	        	        }
	        	        rs3.close ();
	        	        s3.close ();
						} catch (SQLException e1) {
				            System.err.println ("Error message: " + e1.getMessage ());      
				            System.err.println ("Error number: " + e1.getErrorCode ());   
				        }
	        	try {
	        		Statement s4 = conn.createStatement ();
	        		s4.executeQuery ("SELECT DISTINCT D.driver_name "
								   + "FROM driver D NATURAL JOIN license L NATURAL JOIN exam E, "
								   + "license L2 NATURAL JOIN exam E2 "
								   + "WHERE L.driver_ssn = L2.driver_ssn AND "
								   + "E.driver_ssn = E2.driver_ssn AND "
								   + "E.exam_score > E2.exam_score "
								   + "GROUP BY L.driver_ssn, E.exam_score "
								   + "HAVING E.exam_score < 70");
	        	    ResultSet rs4 = s4.getResultSet ();
	        	    System.out.println("Type IV Error - Invalid Exam Score");
	        	    while (rs4.next ())
	        	    {
	        	    	String nameVal = rs4.getString ("driver_name");
	        	        System.out.println (
	        	                    "driver name = " + nameVal);
	        	        }
	        	        rs4.close ();
	        	        s4.close ();
						} catch (SQLException e1) {
				            System.err.println ("Error message: " + e1.getMessage ());      
				            System.err.println ("Error number: " + e1.getErrorCode ());   
				        }
	        	try {
	        		Statement s5 = conn.createStatement ();
	        		s5.executeQuery ("SELECT DISTINCT driver_name "
								   + "FROM driver "
								   + "WHERE driver_ssn NOT IN (SELECT driver_ssn from exam) AND "
								   + "driver_ssn IN (SELECT driver_ssn from license)");
	        	    ResultSet rs5 = s5.getResultSet ();
	        	    System.out.println("Type V Error - No Exam ");
    	    		while (rs5.next()) {
	        	    	String nameVal = rs5.getString ("driver_name");
	        	    	System.out.println (
	        	                    "driver name = " + nameVal);
		        	    
		        	    }
		        	   
	        	        rs5.close ();
	        	        s5.close ();
						} catch (SQLException e1) {
				            System.err.println ("Error message: " + e1.getMessage ());      
				            System.err.println ("Error number: " + e1.getErrorCode ());   
				        }
	        	}
        	
        	
	       
        }
        reader.close();

        
      }catch(SQLException se){
      //Handle errors for JDBC
      se.printStackTrace();
   }catch(Exception e){
      //Handle errors for Class.forName
      e.printStackTrace();
   }finally{
      //finally block used to close resources
      try{
         if(stmt!=null)
            stmt.close();
      }catch(SQLException se2){
      }// nothing we can do
      try{
         if(conn!=null)
            conn.close();
      }catch(SQLException se){
         se.printStackTrace();
      }//end finally try
   }//end try
   System.out.println("Goodbye!");
}//end main
}//end JDBCExample
