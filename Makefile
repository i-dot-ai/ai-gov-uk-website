export

## Terraform 

ifndef env
override env = default
endif
workspace = $(env)
tf_build_args =-var-file="$(CONFIG_DIR)/variables/global.tfvars" -var-file="$(CONFIG_DIR)/variables/$(env).tfvars"  
TF_BACKEND_CONFIG=backend.hcl
CONFIG_DIR=../../ai-gov-uk-website-infra-config

tf_set_workspace:
	terraform -chdir=terraform/ workspace select $(workspace)

tf_new_workspace:
	terraform -chdir=terraform/ workspace new $(workspace)

tf_set_or_create_workspace:
	make tf_set_workspace || make tf_new_workspace

.PHONY: tf_init
tf_init:
	terraform -chdir=./terraform/ init \
	-backend-config='$(CONFIG_DIR)/$(TF_BACKEND_CONFIG)' \
	-backend-config="dynamodb_table=terraform_state" \
	${args}

.PHONY: tf_fmt
tf_fmt:
	terraform fmt

.PHONY: tf_plan
tf_plan:
	make tf_set_workspace && \
	terraform -chdir=./terraform/ plan ${tf_build_args} ${args}

.PHONY: tf_plan
tf_apply:
	make tf_set_workspace && \
	terraform -chdir=./terraform/ apply ${tf_build_args} ${args}
