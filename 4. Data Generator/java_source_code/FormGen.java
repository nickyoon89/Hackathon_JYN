package json;

import java.io.File;
import java.io.FileWriter;
import java.time.LocalDateTime;
import java.util.Scanner;

public class FormGen {
	
	public static void main(String[] args) {
		
		CategoryMap Map = new CategoryMap ();

		Scanner scan = null ;
        try {
            File file = new File( Const.INPUT_FILE );
            scan = new Scanner(file);
            while( scan.hasNextLine() ) {
                Map.add (scan.nextLine()) ;
            }
        } catch ( Exception excp ) {
    		System.out.println( excp ) ;
        } finally {
        	if ( scan!= null ) { scan.close(); }
        }
        
        File file = new File( Const.OUTPUT_FILE +"_"
        		+LocalDateTime.now().format( Const.FORMATTER )
        		+".txt" ) ;
        FileWriter writer = null;
        
        try {
            writer = new FileWriter(file, true);
            writer.write(Map.toString());
            writer.flush();
        } catch ( Exception excp ) {
    		System.out.println( excp ) ;
        } finally {
            try {
                if(writer != null) writer.close();
    		} catch ( Exception excp ) {
    			System.out.println( excp ) ;
			}    
        }
		
	}

}
