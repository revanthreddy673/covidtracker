package com.covidtracker.demo.excelutil;

import java.io.File;
import java.io.FileInputStream;
import java.text.SimpleDateFormat;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.Map;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.covidtracker.demo.entity.CovidCases;
import com.covidtracker.demo.service.CovidCasesServiceImpl;

@Component
public class ExcelUtil {

	
	@Autowired
	private CovidCasesServiceImpl coivdCasesService;
	
	public void readExcelData() {
		try {
			// get the file
			File file= new File("D:\\Courses\\AngularSpringBoot\\CovidCases.xlsx");
			// get bytes from file 
			FileInputStream fileStream= new FileInputStream(file);
			
			XSSFWorkbook workbook = new XSSFWorkbook(fileStream);
			XSSFSheet sheet= workbook.getSheetAt(0);
			
			Iterator<Row> rowItr= sheet.iterator();
			
			while(rowItr.hasNext()) {
				
				Row row= rowItr.next();
				
				if(row.getRowNum() ==0) {
					continue;
				}
				
				Iterator<Cell> cellItr= row.iterator();
				
				
				CovidCases covidCases= new CovidCases();
				
				while(cellItr.hasNext()) {
					
					Cell cell= cellItr.next();
					
					switch (cell.getColumnIndex()) {
					case 1:
						String valueDate= new SimpleDateFormat("dd-MM-YYYY").format(cell.getDateCellValue());
						if(valueDate.split("-").length ==3) {
							if(getMonth(Integer.parseInt(valueDate.split("-")[1]))!=null) {
								covidCases.setMonth(getMonth(Integer.parseInt(valueDate.split("-")[1]))+" "+valueDate.split("-")[2]);
							}
							covidCases.setYear(valueDate.split("-")[2]);
						}
						break;

					case 2:
						covidCases.setRegion(cell.getStringCellValue());
						break;
					
						
					case 3:
						if(cell.getCellType().equals(CellType.NUMERIC)) {
							Double value=cell.getNumericCellValue();
							covidCases.setConfirmedCases(value.longValue());
						}else if(cell.getCellType().equals(CellType.STRING)) {
							covidCases.setConfirmedCases(Long.parseLong(cell.getStringCellValue()));
						} 
						break;
					
					case 4:
						if(cell.getCellType().equals(CellType.NUMERIC)) {
							Double value=cell.getNumericCellValue();
							covidCases.setActiveCases(value.longValue());
						}else if(cell.getCellType().equals(CellType.STRING)) {
							covidCases.setActiveCases(Long.parseLong(cell.getStringCellValue()));
						} 
						break;
						
					case 5:
						if(cell.getCellType().equals(CellType.NUMERIC)) {
							Double value=cell.getNumericCellValue();
							covidCases.setRecovered(value.longValue());
						}else if(cell.getCellType().equals(CellType.STRING)) {
							covidCases.setRecovered(Long.parseLong(cell.getStringCellValue()));
						} 
						break;
						
					case 6:
						if(cell.getCellType().equals(CellType.NUMERIC)) {
							Double value=cell.getNumericCellValue();
							covidCases.setDeaths(value.longValue());
						}else if(cell.getCellType().equals(CellType.STRING)) {
							covidCases.setDeaths(Long.parseLong(cell.getStringCellValue()));
						} 
						break;
						
					default:
						break;
					}
				}
				coivdCasesService.addCovidCases(covidCases);
			}
			
			workbook.close();
		}catch(Exception e) {
			System.out.println("Exception :" +e);
		}
	}
	
	
	public String getMonth(Integer month) {
		Map<Integer, String> monthMap= new LinkedHashMap<>();
		monthMap.put(1, "January");
		monthMap.put(2, "February");
		monthMap.put(3, "March");
		monthMap.put(4, "April");
		monthMap.put(5, "May");
		monthMap.put(6, "June");
		monthMap.put(7, "July");
		monthMap.put(8, "August");
		monthMap.put(9, "September");
		monthMap.put(10, "October");
		monthMap.put(11, "November");
		monthMap.put(12, "December");
		return monthMap.get(month);
	}
	
}
