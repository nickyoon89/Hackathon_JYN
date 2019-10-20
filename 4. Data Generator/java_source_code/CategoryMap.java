package json;

import java.util.Iterator;
import java.util.LinkedHashMap;

public class CategoryMap {
	
	private LinkedHashMap<String,QuestionMap> mCategoryMap = new LinkedHashMap<String,QuestionMap>() ;
	
	public CategoryMap() {
	}
	
	
	public void add ( String _id, String _name, String _question ) {
		if ( mCategoryMap.containsKey( _id ) == false ) {
			mCategoryMap.put( _id, new QuestionMap ( _id, _name ) ) ;
		}
		QuestionMap questionMap = mCategoryMap.get( _id ) ;
		questionMap.add( _name, _question ) ;
	}
	
	public void add ( String _fileline ) {
		String[] token = _fileline.split( Const.DELIMITER ) ;
		if ( token.length == 3 ) {
			add ( token[0], token[1], token[2] );			
		}
	}
	
	public String getString( String _id ) {
		
		QuestionMap questionMap = mCategoryMap.get( _id ) ;
		if ( questionMap == null )
		{
			return null;
		}
		else
		{
			return questionMap.toString() ;			
		}
	}
	
	public String toString() {
		
		StringBuffer buff = new StringBuffer();
		Iterator<QuestionMap> iter = mCategoryMap.values().iterator() ;
		while(iter.hasNext())
		{
			buff.append( iter.next().toString() );
		}
		return buff.toString();
	}

}
