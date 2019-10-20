package json;

import java.util.Iterator;
import java.util.Vector;

public class QuestionList {
	
	public String id ;
	public String name ;
	
	public Vector<String> mList = new Vector<String>() ;
	
	public QuestionList (String _id, String _name) {
		this.id   = _id;
		this.name = _name ;
	}
	
	public void add ( String _question ) {
		mList.add( _question ) ;
	}
	
	public String getForm( String _question ) {
		StringBuffer buff = new StringBuffer();
		buff.append("{").append( Const.NEWLINE );
		buff.append("  \"type\": \"faq\",").append( Const.NEWLINE );
		buff.append("  \"faq\": {").append( Const.NEWLINE );
		buff.append("    \"question\": \"").append( _question ).append( "\"," ).append( Const.NEWLINE );
		buff.append("    \"answer\": \"").append( this.name ).append( "\"" ).append( Const.NEWLINE );
		buff.append("  },").append( Const.NEWLINE );
		buff.append("  \"categories\": [").append( Const.NEWLINE );
		buff.append("    {").append( Const.NEWLINE );
		buff.append("      \"id\": \"").append( this.id ).append( "\"" ).append( Const.NEWLINE ) ;
		buff.append("    }").append( Const.NEWLINE );
		buff.append("  ],").append( Const.NEWLINE );
		buff.append("  \"externalUrl\": \"http://test.co/info/{{$guid}}\"").append( Const.NEWLINE );
		buff.append("},").append( Const.NEWLINE );
		return buff.toString();
	}

	public String toString() {
		StringBuffer buff = new StringBuffer();
		Iterator<String> iter = mList.iterator() ;
		while (iter.hasNext())
		{
			String form = getForm ( iter.next() ) ;
			buff.append( form );
		}
		return buff.toString();
	}
	

}
