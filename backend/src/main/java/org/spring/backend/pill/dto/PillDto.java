package org.spring.backend.pill.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import java.util.List;

@Data
public class PillDto {
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
    public static class Item {

        @JsonProperty("ITEM_SEQ")     private String itemSeq;
        @JsonProperty("ITEM_NAME")    private String itemName;
        @JsonProperty("ENTP_NAME")    private String entpName;
        @JsonProperty("CHART")        private String chart;
        @JsonProperty("ITEM_IMAGE")   private String itemImage;
        @JsonProperty("PRINT_FRONT")  private String printFront;
        @JsonProperty("PRINT_BACK")   private String printBack;
        @JsonProperty("DRUG_SHAPE")   private String drugShape;
        @JsonProperty("COLOR_CLASS1") private String colorClass1;
        @JsonProperty("COLOR_CLASS2") private String colorClass2;   
        @JsonProperty("CLASS_NAME") private String className;


        private String efficacy;
    }
}