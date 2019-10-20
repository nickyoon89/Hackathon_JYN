package json;

import java.util.Iterator;
import java.util.LinkedHashMap;

public class QuestionMap {
	
	public String id ;
	public String name ;
	
	private  LinkedHashMap<String,QuestionList> mQuestionMap = new  LinkedHashMap<String,QuestionList>() ;
	
	public QuestionMap ( String _id, String _name ) {
		this.id = _id ;
		this.name = _name ;
	}
	
	public void add ( String _name, String _question ) {
		if ( mQuestionMap.containsKey( _name ) == false ) {
			mQuestionMap.put( _name, new QuestionList ( id, _name ) ) ;
		}
		
		QuestionList list = mQuestionMap.get( _name ) ;
		list.add( _question ) ;
	}
	
	public String toString() {
		
		StringBuffer buff = new StringBuffer();
	
		Iterator<QuestionList> iter = mQuestionMap.values().iterator() ;
		while(iter.hasNext())
		{
			buff.append( iter.next().toString() );
		}
		return buff.toString();
	}
}
