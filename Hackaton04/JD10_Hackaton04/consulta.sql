select prh.requisition_number as nrosolicitud,
       prh.description as descripcion_sol,
       to_char(
          prl.creation_date,
          'dd/mm/yyyy hh24:mi:ss'
       ) as fecha_creacion_sol,
       flvl2.meaning as estado_solicitud,
       sum(
          case
             when prl.line_type_id in(1,
                                      7) then
                round(
                   prl.currency_unit_price * prl.quantity,
                   2
                )
             when prl.line_type_id = 6 then
                nvl(
                   prl.currency_amount,
                   0
                )
             else
                0
          end
       ) as importe_sol,
       prl.currency_code as moneda_soli,
       ppn.display_name as solicitante,
       poh.segment1 as nroordencompra,
       flvl.meaning as estado_oc,
       psp.income_tax_id as ruc,
       hp.party_name as proveedor,
       to_char(
          poh.creation_date,
          'dd/mm/yyyy hh24:mi:ss'
       ) as fecha_crea_ord
  from por_requisition_headers_all prh
  join por_requisition_lines_all prl
on prl.requisition_header_id = prh.requisition_header_id
  join por_req_distributions_all prd
on prd.requisition_line_id = prl.requisition_line_id
  left join po_line_locations_all poll
on poll.po_line_id = prl.po_line_id
   and poll.po_header_id = prl.po_header_id
  left join po_distributions_all pod
on pod.po_header_id = poll.po_header_id
   and pod.po_line_id = poll.po_line_id
   and pod.line_location_id = poll.line_location_id
   and pod.req_distribution_id = prd.distribution_id
  left join po_lines_all poli
on poli.po_line_id = poll.po_line_id
   and poli.po_header_id = poll.po_header_id
  left join po_headers_all poh
on poh.po_header_id = poli.po_header_id
  left join fnd_lookup_values_vl flvl
on flvl.lookup_type = 'ORDER_STATUS'
   and flvl.lookup_code = poh.document_status
  join fnd_lookup_values_vl flvl2
on flvl2.lookup_type = 'POR_DOCUMENT_STATUS'
   and flvl2.lookup_code = prh.document_status
  join fnd_lookup_values_vl flvl3
on flvl3.lookup_type = 'POR_LINE_STATUS'
   and flvl3.lookup_code = prl.line_status
  join fnd_lookup_values_vl flvl4
on flvl4.lookup_type = 'POR_DESTINATION_TYPE'
   and flvl4.lookup_code = prl.destination_type_code
  join egp_categories_vl ecv
on ecv.category_id = prl.category_id
  join po_line_types_tl pltt
on pltt.line_type_id = prl.line_type_id
   and pltt.language = 'E'
  join gl_code_combinations gcc
on gcc.code_combination_id = prd.code_combination_id
  join fun_all_business_units_v fabuv1
on fabuv1.bu_id = prh.req_bu_id
  left join pon_auction_headers_all paha
on paha.auction_header_id = prl.auction_header_id
  join per_person_names_f ppn
on ppn.person_id = prl.requester_id
   and ppn.name_type = 'GLOBAL'
  left join poz_suppliers_pii psp
on psp.vendor_id = poh.vendor_id
  left join poz_suppliers ps
on ps.vendor_id = poh.vendor_id
  left join hz_parties hp
on hp.party_id = ps.party_id
 where prh.line_group <> 'TRANSFER_ORDER'
   and flvl3.meaning not in ( 'Cancelada' )
   and flvl2.meaning = 'Aprobada'
   and poh.segment1 is not null
 group by prh.requisition_number,
          prh.description,
          to_char(
             prl.creation_date,
             'dd/mm/yyyy hh24:mi:ss'
          ),
          flvl2.meaning,
          prl.currency_code,
          ppn.display_name,
          poh.segment1,
          flvl.meaning,
          psp.income_tax_id,
          hp.party_name,
          to_char(
             poh.creation_date,
             'dd/mm/yyyy hh24:mi:ss'
          )
 order by to_number(regexp_replace(
   prh.requisition_number,
   '[^0-9]',
   ''
)) desc