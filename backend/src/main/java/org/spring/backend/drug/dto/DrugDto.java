package org.spring.backend.drug.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import java.util.List;

@Data
public class DrugDto {
    private Header header;
    private Body body;

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Header {
        private String resultCode;
        private String resultMsg;
    }

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Body {
        private int pageNo;
        private int totalCount;
        private int numOfRows;
        private List<Item> items;
    }

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)     public static class Item {

        @JsonAlias("itemSeq")
        private String itemSeq;     
        @JsonAlias("itemName")
        private String itemName;    
        @JsonAlias("entpName")
        private String entpName;    
                @JsonAlias("efcyQesitm")
        private String efficacy;    
        @JsonAlias("useMethodQesitm")
        private String useMethod;   
        @JsonAlias("atpnQesitm")
        private String caution;     
        @JsonAlias("itemImage")
        private String itemImage;       }
}