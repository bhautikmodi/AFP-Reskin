<?php

class CourseLevel_model extends CI_Model
 {

	public function add_CourseLevel($post_CourseLevel) {
	
		if($post_CourseLevel) {
			if($post_CourseLevel['IsActive']==1){
				$IsActive = true;
			} else {
				$IsActive = false;
			}
			$CourseLevel_data = array(
				'Key' => 'CourseLevel',
				'Value' => $post_CourseLevel['CourseLevel'],
				'DisplayText' => $post_CourseLevel['Keyword'],
				'Description' => $post_CourseLevel['Description'],
				'IsActive' =>$IsActive
			
			);
			
			$res = $this->db->insert('tblmstconfiguration',$CourseLevel_data);
			
			if($res) {
				return true;
			} else {
				return false;
			}
	
		} else {
			return false;
		}
	}
	
	public function getlist_CourseLevel() {
	
		$this->db->select('*');
		$result = $this->db->get('tblmstconfiguration');
		
		$res = array();
		if($result->result()) {
			$res = $result->result();
		}
		return $res;
		
	}
	
	
	public function get_CourseLeveldata($Configuration_id = NULL)
	{
		
		if($Configuration_id) {
			
			$this->db->select('*');
			$this->db->where('ConfigurationId',$Configuration_id);
			$result = $this->db->get('tblmstconfiguration');
			
			$company_data = array();
			foreach($result->result() as $row) {
				$company_data = $row;
			}
			return $company_data;
			
		} else {
			return false;
		}
	}
	
	
	public function edit_CourseLevel($post_CourseLevel) {
	
		if($post_CourseLevel) {
			if($post_CourseLevel['IsActive']==1){
				$IsActive = true;
			} else {
				$IsActive = false;
			}
			$CourseLevel_data = array(
	                
				'Value' => $post_CourseLevel['CourseLevel'],
				'DisplayText' => $post_CourseLevel['Keyword'],
				'Description' => $post_CourseLevel['Description'],
				'IsActive' => $IsActive
			
			);
			
			$this->db->where('ConfigurationId',$post_CourseLevel['ConfigurationId']);
			$res = $this->db->update('tblmstconfiguration',$CourseLevel_data);
			
			if($res) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}	
	
	}
	
	
	public function delete_CourseLevel($Configuration_id) {
	
		if($Configuration_id) {
			
			$this->db->where('ConfigurationId',$Configuration_id);
			$res = $this->db->delete('tblmstconfiguration');
			
			if($res) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
		
	}
	
}
